import { ProgramContext, ResourceContext, ObjectContext, PropertyContext, ArrayContext, InputDeclContext, OutputDeclContext, VariableContext, ModuleContext } from '../antlr4/ArmLangParser';
import { Dictionary, keyBy, uniq, difference } from 'lodash';
import { AbstractArmVisitor, Scope, GlobalScope, TemplateWriter } from './common';
import { getDependencyOrder } from './dependencybuilder';

const providerLookup: Dictionary<string> = {
  network: 'Microsoft.Network',
  compute: 'Microsoft.Compute',
  storage: 'Microsoft.Storage',
}

function parseAzrmTypeString(type: string) {
  const [typeString, apiVersion] = type.split('@');
  let [provider, ...typeArray] = typeString.split('/');

  if (providerLookup[provider]) {
    provider = providerLookup[provider];
  }

  let fullType = `${provider}/${typeArray.join('/')}`

  return {
    apiVersion,
    fullType,
  };
}

function parseModuleTypeString(type: string) {
  let splitType = type.split('@');
  if (splitType.length > 1) {
    throw new Error(`Unable to parse module type '${type}'`);
  }

  return {
    name: splitType.length === 1 ? splitType[0] : splitType[1],
    path: splitType.length === 1 ? splitType[1] : undefined,
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

function parseAstString(input: string) {
  return input
    .substring(1, input.length - 1)
    .replace(/\\\'/g, '\'')
    .replace(/\\\\/g, '\\');
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

function findResourceDependencies(identifier: string, scope: Scope) {
  const dependencies = scope.dependencies[identifier].children;

  const resourceDependencies: string[] = [];
  for (const child of Object.keys(dependencies)) {
    if (scope.resources.indexOf(child) !== -1) {
      resourceDependencies.push(child);
    } else {
      const childDependencies = findResourceDependencies(child, scope);
      resourceDependencies.push(...childDependencies);
    }
  }

  return uniq(resourceDependencies);
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
  variables: Dictionary<(isTopLevel: boolean) => any> = {};
  resources: Dictionary<any> = {};
}

class TemplateData {
  parameters: Dictionary<any> = {};
  resources: any[] = [];
  outputs: Dictionary<any> = {};
}

export class TemplateGeneratorVisitor extends AbstractArmVisitor {
  constructor(globalScope: GlobalScope, writer: TemplateWriter) {
    super(globalScope);
    this.writer = writer;
  }

  private writer: TemplateWriter;
  private globalState: ScopeState = new ScopeState(this.globalScope);
  private currentState: ScopeState = this.globalState;
  private template: TemplateData = new TemplateData();
  private moduleCtxts: Dictionary<ModuleContext> = {};
  
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

    const template = {
      $schema: 'https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#',
      contentVersion: '1.0.0.0',
      parameters: this.template.parameters,
      resources: this.template.resources,
      outputs: this.template.outputs,
    };

    this.writer.write(template);
  }

  visitVariable(ctx: VariableContext) {
    this.currentState.variables[ctx.Identifier().text] = isTopLevel => this.visitPropertyInternal(ctx.property(), isTopLevel);
  }

  visitInputDecl(ctx: InputDeclContext) {
    const name = ctx.Identifier().text;
    const type = ctx.type().text;

    if (this.currentState === this.globalState) {
      this.template.parameters[name] = {
        type: type,
      };
    }
  }

  visitOutputDecl(ctx: OutputDeclContext) {
    const name = ctx.Identifier().text;
    const value = this.visitTopLevelProperty(ctx.property());

    if (this.currentState === this.globalState) {
      this.template.outputs[name] = {
        // TODO add other types for output
        type: 'string',
        value: value,
      };
    }
  }

  visitAzrmResource(ctx: ResourceContext) {
    const identifier = ctx.Identifier(1).text;
    const resourceDependencies = findResourceDependencies(identifier, this.currentState.scope);
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

    this.template.resources.push(resource);
    this.currentState.resources[ctx.Identifier(1).text] = resource;
  }

  visitModuleResource(ctx: ResourceContext) {
    const identifier = ctx.Identifier(1).text;
    const { name, path } = parseModuleTypeString(parseAstString(ctx.String().text));

    if (path) {
      throw this.buildError(`Unable to process ${identifier} - file-based modules are not yet implemented`, ctx.Identifier(1).symbol);
    }

    const moduleScope = this.globalScope.modules[name];
    if (!moduleScope) {
      throw this.buildError(`Unable to find module '${name}'`, ctx.Identifier(1).symbol);
    }

    this.callModule(name, ctx);
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

  callModule(name: string, ctx: ResourceContext) {
    const moduleCtx = this.moduleCtxts[name];
    const resourceCtxts = moduleCtx.section().map(s => s.resource()).filter(x => x != undefined) as ResourceContext[];
    const variableCtxts = moduleCtx.section().map(s => s.variable()).filter(x => x !== undefined) as VariableContext[];

    const moduleScope = this.globalScope.modules[name];

    const givenInputs = keyBy(ctx.object().objectProperty(), i => i.Identifier().text);
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

    const oldState = this.currentState;
    const newState = new ScopeState(moduleScope);

    for (const inputName of givenInputNames) {
      newState.variables[inputName] = isTopLevel => {
        this.currentState = oldState;
        const output = this.visitPropertyInternal(givenInputs[inputName].property(), isTopLevel);
        this.currentState = newState;

        return output;
      }
    }

    this.currentState = newState;

    this.visitInDependencyOrder(moduleScope, resourceCtxts, variableCtxts);

    this.currentState = oldState;
  }

  visitModule(ctx: ModuleContext) {
    const name = ctx.Identifier().text;

    this.moduleCtxts[name] = ctx;
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
    const output = this.visitProperty(ctx);
    if (ctx.String()) {
      return toParamString(output);
    }

    return output;
  }

  visitTopLevelProperty(ctx: PropertyContext): any {
    return this.visitPropertyInternal(ctx, true);
  }

  visitProperty(ctx: PropertyContext): any {
    return this.visitPropertyInternal(ctx, false);
  }

  visitPropertyInternal(ctx: PropertyContext, isTopLevel: boolean): any {
    const stringText = ctx.String()?.text;
    if (stringText) {
      const output = parseAstString(stringText);
      return isTopLevel ? toExpressionString(output) : output;
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
        return this.currentState.variables[identifier.text](isTopLevel);
      }

      if (this.template.parameters[identifier.text]) {
        return formatFunction('parameters', [toParamString(identifier.text)], isTopLevel);
      }

      if (this.currentState.resources[identifier.text]) {
        const resource = this.currentState.resources[identifier.text];

        let propertyTail = ctx.propertyTail();
        if (propertyTail?.propertyCall() === undefined) {
          throw this.buildError(`Invalid resource reference`, identifier.symbol);
        }

        const properties: string[] = [];
        while (propertyTail?.propertyCall() !== undefined) {
          const property = propertyTail?.propertyCall()?.text as string;

          properties.push(property);
          propertyTail = propertyTail.propertyTail();
        }

        if (properties[0] === 'properties') {
          const reference = formatFunction('reference', [toResourceIdExpression(resource, false)], false);
          const output = `${reference}.${properties.slice(1).join('.')}`;
          return isTopLevel ? `[${output}]` : output;
        } else {
          const reference = formatFunction('reference', [toResourceIdExpression(resource, false), toParamString(resource.apiVersion), toParamString('full')], false);
          const output = `${reference}.${properties.join('.')}`;
          return isTopLevel ? `[${output}]` : output;
        }
      }

      throw this.buildError(`Direct references to resources are not yet supported!`, identifierCallCtx.Identifier().symbol);
      // TODO handle functions like .id() here, and property access using reference().
    }

    const functionCallCtx = ctx.functionCall();
    if (functionCallCtx) {
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
          return toResourceIdExpression(resource, isTopLevel);
        default:
          const params = functionCallCtx.property().map(p => this.visitFunctionParamProperty(p));

          return formatFunction(functionName, params, isTopLevel);
      }
    }

    return this.visitChildren(ctx);
  }
}