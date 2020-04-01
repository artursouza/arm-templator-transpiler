import { ProgramContext, ResourceContext, ObjectContext, PropertyContext, ArrayContext, InputDeclContext, OutputDeclContext, VariableContext, ModuleContext } from '../antlr4/ArmLangParser';
import { Dictionary, keyBy, uniq, difference } from 'lodash';
import { AbstractArmVisitor, Scope, GlobalScope, TemplateWriter, parseAstString, parseModuleTypeString, resolvePath } from './common';
import { getDependencyOrder, getResourceDependencies } from '../dependencies';
import path from 'path';
import { Token } from 'antlr4ts';

type InputCallFunction = (isTopLevel: boolean, isParam: boolean) => any;

function parseAzrmTypeString(type: string) {
  const [typeString, apiVersion] = type.split('@');
  let [provider, ...typeArray] = typeString.split('/');

  if (provider.indexOf('.') === -1) {
    // assume Microsoft unless the namespace contains a '.'
    provider = `Microsoft.${provider}`;
  }

  let fullType = `${provider}/${typeArray.join('/')}`

  return {
    apiVersion,
    fullType,
  };
}

function formatFunction(name: string, params: any[], isTopLevel: boolean) {
  const paramValues = [];
  for (const param of params) {
    if (typeof param === 'string' || typeof param === 'number' || typeof param === 'boolean') {
      paramValues.push(param);
    } else {
      throw new Error(`Invalid value passed to concat function`);
    }
  }
  const output = `${name}(${paramValues.join(', ')})`;
  return isTopLevel ? `[${output}]` : output;
}

function toParamString(input: string) {
  const output = input
    .replace(/\'/g, '\'\'');

  return `'${output}'`;
}

function toExpressionString(input: string) {
  if (input.startsWith('[')) {
    return '[' + input;
  }

  return input;
}

function toResourceIdExpression(resource: any, isTopLevel: boolean) {
  // TODO very hacky - fix this!
  function unescapeExpression(input: string) {
    if (input.length >= 2 && input[0] === '[' && input[input.length -1] === ']') {
      return input.substring(1, input.length -1);
    } else {
      return toParamString(input);
    }
  }

  return formatFunction('resourceId', [unescapeExpression(resource.type), unescapeExpression(resource.name)], isTopLevel);
}

class ScopeState {
  constructor(scope: Scope) {
    this.scope = scope;
  }
  scope: Scope;
  variables: Dictionary<InputCallFunction> = {};
  resources: Dictionary<any> = {};
}

export class TemplateVisitor extends AbstractArmVisitor {
  constructor(globalScope: GlobalScope, writer: TemplateWriter, externalVisitors: Dictionary<TemplateVisitor>) {
    super(globalScope);
    this.writer = writer;
    this.externalVisitors = externalVisitors;
  }

  private parameterNames = new Set<string>();
  private writer: TemplateWriter;
  private globalState: ScopeState = new ScopeState(this.globalScope);
  private currentState: ScopeState = this.globalState;
  public modules: Dictionary<(ctx: ResourceContext, inputs: Dictionary<InputCallFunction>) => void> = {};
  public externalVisitors: Dictionary<TemplateVisitor>
  
  visitInDependencyOrder(scope: Scope, resourceCtxts: ResourceContext[], variableCtxts: VariableContext[]) {
    // important to visit in dependency order so that we don't end up with 
    // references that can't be evaluated.

    const resourcesByIdentifier = keyBy(resourceCtxts, ctx => ctx.Identifier(1).text);
    const variablesByIdentifier = keyBy(variableCtxts, ctx => ctx.Identifier().text);
    const dependencyOrder = getDependencyOrder(scope.dependencies);


    for (const dependency of dependencyOrder) {
      const resourceCtx = resourcesByIdentifier[dependency];
      if (resourceCtx) {
        this.visit(resourceCtx);
        continue;
      }
      
      const variableCtx = variablesByIdentifier[dependency];
      if (variableCtx) {
        this.visit(variableCtx);
        continue;
      }
    }
  }

  visitProgram(ctx: ProgramContext) {
    for (const moduleCtx of ctx.module()) {
      this.visitModule(moduleCtx);
    }

    // don't want to generate a template for module imports
    if (this.globalScope.isModuleImport) {
      return;
    }

    const inputCtxts = ctx.section().map(s => s.inputDecl()).filter(x => x !== undefined) as InputDeclContext[];
    const outputCtxts = ctx.section().map(s => s.outputDecl()).filter(x => x !== undefined) as OutputDeclContext[];
    const resourceCtxts = ctx.section().map(s => s.resource()).filter(x => x != undefined) as ResourceContext[];
    const variableCtxts = ctx.section().map(s => s.variable()).filter(x => x !== undefined) as VariableContext[];

    for (const inputCtx of inputCtxts) {
      this.visitInputDecl(inputCtx);
    }

    this.visitInDependencyOrder(this.currentState.scope, resourceCtxts, variableCtxts);

    for (const outputCtx of outputCtxts) {
      this.visitOutputDecl(outputCtx);
    }
  }

  visitVariable(ctx: VariableContext) {
    this.currentState.variables[ctx.Identifier().text] = (isTopLevel, isParam) => this.visitPropertyInternal(ctx.property(), isTopLevel, isParam);
  }

  visitInputDecl(ctx: InputDeclContext) {
    const name = ctx.Identifier().text;
    const type = ctx.type().text;

    if (this.currentState === this.globalState) {
      this.parameterNames.add(name);
      this.writer.writeParameter(name, {
        type: type,
      });
    }
  }

  visitOutputDecl(ctx: OutputDeclContext) {
    const name = ctx.Identifier().text;
    const value = this.visitTopLevelProperty(ctx.property());

    if (this.currentState === this.globalState) {
      this.writer.writeOutput(name, {
        // TODO add other types for output
        type: 'string',
        value: value,
      });
    }
  }

  visitAzrmResource(ctx: ResourceContext) {
    const identifier = ctx.Identifier(1).text;
    const resourceDependencies = getResourceDependencies(this.currentState.scope, identifier);
    const dependsOn = [];
    for (const resource of resourceDependencies) {
      const resourceIdExpression = toResourceIdExpression(this.currentState.resources[resource], true);
      dependsOn.push(resourceIdExpression);
    }

    const resourceBody = this.visitObject(ctx.object());

    const { apiVersion, fullType } = parseAzrmTypeString(parseAstString(ctx.String().text));
    const resource = {
      apiVersion,
      type: fullType,
      ...resourceBody,
      dependsOn: dependsOn.length > 0 ? dependsOn : undefined,
    };

    this.writer.writeResource(resource);
    this.currentState.resources[ctx.Identifier(1).text] = resource;
  }

  visitModuleResource(ctx: ResourceContext) {
    const module = parseModuleTypeString(parseAstString(ctx.String().text));
    const givenInputs = keyBy(ctx.object().objectProperty(), i => i.Identifier().text);

    const currentState = this.currentState;
    const inputs: Dictionary<InputCallFunction> = {};
    for (const inputName of Object.keys(givenInputs)) {
      inputs[inputName] = (isTopLevel, isParam) => this.doWithNewState(currentState, () => {
        return this.visitPropertyInternal(givenInputs[inputName].property(), isTopLevel, isParam);
      });
    }

    if (module.path) {
      const parentPath = path.dirname(this.globalScope.filePath);
      const modulePath = resolvePath(parentPath, module.path);

      this.externalVisitors[modulePath].callModule(module.name, ctx, inputs);
    } else {
      this.callModule(module.name, ctx, inputs);
    }
  }

  visitResource(ctx: ResourceContext) {
    const provider = ctx.Identifier(0).text;

    switch (provider) {
      case 'azrm':
        this.visitAzrmResource(ctx);
        break;
      case 'mod':
        this.visitModuleResource(ctx);
        break;
      default:
        throw this.buildError(`Provider ${provider} is not supported in this prototype!`, ctx.Identifier(0).symbol);
      }
  }

  callModule(name: string, ctx: ResourceContext, inputs: Dictionary<InputCallFunction>) {
    const moduleFunc = this.modules[name];
    if (!moduleFunc) {
      throw this.buildError(`Unable to find module '${moduleFunc}'`, ctx.Identifier(1).symbol);
    }

    moduleFunc(ctx, inputs);
  }

  doWithNewState<T>(newState: ScopeState, action: () => T) {
    const oldState = this.currentState;
    this.currentState = newState;
    try {
      return action();
    } finally {
      this.currentState = oldState;
    }
  }

  visitModule(moduleCtx: ModuleContext) {
    const name = moduleCtx.Identifier().text;
    const moduleScope = this.globalScope.modules[name];
    const moduleState = this.currentState;

    const resourceCtxts = moduleCtx.section().map(s => s.resource()).filter(x => x != undefined) as ResourceContext[];
    const variableCtxts = moduleCtx.section().map(s => s.variable()).filter(x => x !== undefined) as VariableContext[];

    this.modules[name] = (ctx, givenInputs) => {
      // ctx: the 'outer' scope (caller of the module)
      // moduleCtx: the 'inner' scop (the module itself)

      this.doWithNewState(new ScopeState(moduleScope), () => {
        const givenInputNames = Object.keys(givenInputs);
        const requiredInputNames = Object.keys(moduleScope.inputs);

        const requiredNotGiven = difference(requiredInputNames, givenInputNames);
        if (requiredNotGiven.length > 0) {
          throw this.buildError(`Missing required input(s) for module '${name}': '${requiredNotGiven.join('\', \'')}'.`, ctx.Identifier(1).symbol);
        }

        const givenNotRequired = difference(givenInputNames, requiredInputNames);
        if (givenNotRequired.length > 0) {
          throw this.buildError(`Unexpected extraneous input(s) for module '${name}': '${givenNotRequired.join('\', \'')}'.`, ctx.Identifier(1).symbol);
        }

        for (const inputName of givenInputNames) {
          this.currentState.variables[inputName] = givenInputs[inputName];
        }

        this.visitInDependencyOrder(moduleScope, resourceCtxts, variableCtxts);
      });
    }
  }

  visitObject(ctx: ObjectContext) {
    const output: Dictionary<any> = {};
    const properties = ctx.objectProperty();
    for (const property of properties) {
      const name = property.Identifier().text;
      const value = this.visitTopLevelProperty(property.property());

      output[name] = value;
    }
    
    return output;
  }

  visitArray(ctx: ArrayContext) {
    return ctx.property().map(p => this.visitTopLevelProperty(p));
  }

  visitFunctionParamProperty(ctx: PropertyContext): any {
    const output = this.visitPropertyInternal(ctx, false, true);
 
    return output;
  }

  visitTopLevelProperty(ctx: PropertyContext): any {
    return this.visitPropertyInternal(ctx, true, false);
  }

  visitProperty(ctx: PropertyContext): any {
    return this.visitPropertyInternal(ctx, false, false);
  }

  visitPropertyInternal(ctx: PropertyContext, isTopLevel: boolean, isParam: boolean): any {
    const stringText = ctx.String()?.text;
    if (stringText) {
      const output = parseAstString(stringText);
      if (isTopLevel) {
        return toExpressionString(output);
      }
      if (isParam) {
        return toParamString(output);
      }
      return output;
    }

    const boolText = ctx.Bool()?.text;
    if (boolText) {
      return boolText === 'true';
    }

    const numberText = ctx.Number()?.text;
    if (numberText) {
      return parseInt(numberText);
    }

    const arrayCtx = ctx.array();
    if (arrayCtx) {
      return this.visitArray(arrayCtx);
    }

    const objectCtx = ctx.object();
    if (objectCtx) {
      return this.visitObject(objectCtx);
    }

    const identifierCallCtx = ctx.identifierCall();
    if (identifierCallCtx) {
      const identifier = identifierCallCtx.Identifier();

      if (this.currentState.variables[identifier.text]) {
        return this.currentState.variables[identifier.text](isTopLevel, isParam);
      }

      if (this.currentState.resources[identifier.text]) {
        const resource = this.currentState.resources[identifier.text];

        let propertyTail = ctx.propertyTail();
        let reference: string;
        if (propertyTail?.propertyCall()?.text === 'properties') {
          reference = formatFunction('reference', [toResourceIdExpression(resource, false)], false);
          propertyTail = propertyTail?.propertyTail();
        } else {
          reference = formatFunction('reference', [toResourceIdExpression(resource, false), toParamString(resource.apiVersion), toParamString('full')], false);
        }

        while (propertyTail !== undefined) {
          if (propertyTail.childCount === 0) {
            break;
          }

          const property = propertyTail?.propertyCall()?.text as string;
          if (property) {
            reference += `.${property}`;
            propertyTail = propertyTail.propertyTail();
            continue;
          }

          const number = propertyTail?.Number()?.text as string;
          if (number) {
            reference += `[${number}]`;
            propertyTail = propertyTail.propertyTail();
            continue;
          }

          throw this.buildError(`Invalid resource reference`, propertyTail.start);
        }

        return isTopLevel ? `[${reference}]` : reference;
      }

      if (this.parameterNames.has(identifier.text)) {
        return formatFunction('parameters', [toParamString(identifier.text)], isTopLevel);
      }

      throw this.buildError(`Direct references to resources are not yet supported!`, identifierCallCtx.Identifier().symbol);
      // TODO handle functions like .id() here, and property access using reference().
    }

    const functionCallCtx = ctx.functionCall();
    if (functionCallCtx) {
      let propertyTail = ctx.propertyTail();
      const properties: string[] = [];
      while (propertyTail?.propertyCall() !== undefined) {
        const property = propertyTail?.propertyCall()?.text as string;

        properties.push(property);
        propertyTail = propertyTail.propertyTail();
      }

      const functionName = functionCallCtx.Identifier().text;
      switch (functionName) {
        case 'resourceId':
          if (functionCallCtx.property().length !== 1) {
            throw this.buildError(`Invalid number of params passed to resourceId function (expecting 1)`, functionCallCtx.Identifier().symbol);
          }

          const identifier = functionCallCtx.property(0).identifierCall()?.text;
          if (!identifier || !this.currentState.resources[identifier]) {
            throw this.buildError(`Invalid resource passed to resourceId function`, functionCallCtx.Identifier().symbol);
          }

          const resource = this.currentState.resources[identifier];

          // TODO improve this
          if (properties.length > 0) {
            const functionString = toResourceIdExpression(resource, false);
            const output = `${functionString}.${properties.join('.')}`;
            return isTopLevel ? `[${output}]` : output;
          }

          return toResourceIdExpression(resource, isTopLevel);
        default:
          const params = functionCallCtx.property().map(p => this.visitFunctionParamProperty(p));

          if (properties.length > 0) {
            const functionString = formatFunction(functionName, params, false);
            const output = `${functionString}.${properties.join('.')}`;
            return isTopLevel ? `[${output}]` : output;
          }

          return formatFunction(functionName, params, isTopLevel);
      }
    }

    return this.visitChildren(ctx);
  }
}