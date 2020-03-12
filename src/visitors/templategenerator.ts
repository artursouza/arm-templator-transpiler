import { ProgramContext, ResourceContext, ObjectContext, PropertyContext, ArrayContext, InputDeclContext, OutputDeclContext, VariableContext } from '../antlr4/ArmLangParser';
import { Dictionary, keyBy, uniq } from 'lodash';
import { AbstractArmVisitor, Scope, GlobalScope, TemplateWriter } from './common';
import { getDependencyOrder } from './DependencyBuilder';

const providerLookup: Dictionary<string> = {
  network: 'Microsoft.Network',
  compute: 'Microsoft.Compute',
  storage: 'Microsoft.Storage',
}

function parseAzrmTypeString(type: string) {
  let provider = type.split('/')[0];
  if (providerLookup[provider]) {
    provider = providerLookup[provider];
  }

  let apiVersion = type.split('@')[1];
  let fullType = `${provider}/${type.split('/')[1].split('@')[0]}`

  return {
    apiVersion,
    fullType,
  };
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
  if (!input.startsWith) {
    throw input;
  }
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

export class TemplateGeneratorVisitor extends AbstractArmVisitor {
  constructor(globalScope: GlobalScope, writer: TemplateWriter) {
    super(globalScope);
    this.writer = writer;
  }

  private writer: TemplateWriter;
  private variables: Dictionary<any> = {};
  private parameters: Dictionary<any> = {};
  private resources: Dictionary<any> = {};
  private outputs: Dictionary<any> = {};
  
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
    const inputCtxts = ctx.section().map(s => s.inputDecl()).filter(x => x !== undefined) as InputDeclContext[];
    const outputCtxts = ctx.section().map(s => s.outputDecl()).filter(x => x !== undefined) as OutputDeclContext[];
    const resourceCtxts = ctx.section().map(s => s.resource()).filter(x => x != undefined) as ResourceContext[];
    const variableCtxts = ctx.section().map(s => s.variable()).filter(x => x !== undefined) as VariableContext[];

    for (const inputCtx of inputCtxts) {
      this.visitInputDecl(inputCtx);
    }

    this.visitInDependencyOrder(this.globalScope, resourceCtxts, variableCtxts);

    for (const outputCtx of outputCtxts) {
      this.visitOutputDecl(outputCtx);
    }

    // TODO visit modules

    const template = {
      $schema: 'https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#',
      contentVersion: '1.0.0.0',
      parameters: this.parameters,
      resources: Object.keys(this.resources).map(k => this.resources[k]),
      outputs: this.outputs,
    };

    this.writer.write(template);
  }

  visitVariable(ctx: VariableContext) {
    this.variables[ctx.Identifier().text] = this.visitTopLevelProperty(ctx.property());
  }

  visitInputDecl(ctx: InputDeclContext) {
    const name = ctx.Identifier().text;
    const type = ctx.type().text;

    this.parameters[name] = {
      type: type,
    };
  }

  visitOutputDecl(ctx: OutputDeclContext) {
    const name = ctx.Identifier().text;
    const value = this.visitTopLevelProperty(ctx.property());

    this.outputs[name] = {
      // TODO add other types for output
      type: 'string',
      value: value,
    };
  }

  visitResource(ctx: ResourceContext) {
    const provider = ctx.Identifier(0).text;
    if (provider !== 'azrm') {
      throw new Error(`Provider ${provider} is not supported in this prototype!`);
    }

    const identifier = ctx.Identifier(1).text;
    const resourceDependencies = findResourceDependencies(identifier, this.globalScope);
    const dependsOn = [];
    for (const resource of resourceDependencies) {
      const resourceIdExpression = `[resourceId(${this.unescapeExpression(this.resources[resource].type)}, ${this.unescapeExpression(this.resources[resource].name)})]`;
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

    this.resources[ctx.Identifier(1).text] = resource;
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

  visitTopLevelProperty(ctx: PropertyContext): any {
    const output = this.visitProperty(ctx);
    if (typeof output === 'string') {
      if (ctx.identifierCall() || ctx.functionCall()) {
        return `[${output}]`;
      }

      return toExpressionString(output);
    }

    return output;
  }

  visitFunctionParamProperty(ctx: PropertyContext): any {
    const output = this.visitProperty(ctx);
    if (ctx.String()) {
      return toParamString(output);
    }

    return output;
  }

  unescapeExpression(input: string) {
    // TODO very hacky - fix this!
    if (input.length >= 2 && input[0] === '[' && input[input.length -1] === ']') {
      return input.substring(1, input.length -1);
    } else {
      return toParamString(input);
    }
  }

  visitProperty(ctx: PropertyContext): any {
    const stringText = ctx.String()?.text;
    if (stringText) {
      return parseAstString(stringText);
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
      if (this.variables[identifierCallCtx.text]) {
        return this.variables[identifierCallCtx.text];
      }

      if (this.parameters[identifierCallCtx.text]) {
        return `parameters('${identifierCallCtx.text}')`;
      }

      throw new Error(`Direct references to resources are not yet supported in this prototype!`);
      // TODO handle functions like .id() here, and property access using reference().
    }

    const functionCallCtx = ctx.functionCall();
    if (functionCallCtx) {
      const functionName = functionCallCtx.Identifier().text;
      switch (functionName) {
        case 'resourceId':
          if (functionCallCtx.property().length !== 1) {
            throw new Error(`Invalid number of params passed to resourceId function (expecting 1)`)
          }

          const identifier = functionCallCtx.property(0).identifierCall()?.text;
          if (!identifier || !this.resources[identifier]) {
            throw new Error(`Invalid resource passed to resourceId function`);
          }

          const resource = this.resources[identifier];
          // todo improve this
          return `resourceId(${this.unescapeExpression(resource.type)}, ${this.unescapeExpression(resource.name)})`;
        default:
          const evaluatedValues: any[] = [];
          for (const property of functionCallCtx.property()) {
            const evaluated = this.visitFunctionParamProperty(property);
            if (typeof evaluated !== 'string' && typeof evaluated !== 'number' && typeof evaluated !== 'boolean') {
              throw new Error(`Invalid value passed to concat function`);
            }
            evaluatedValues.push(evaluated);
          }

          return `${functionName}(${evaluatedValues.join(', ')})`
      }
    }

    return this.visitChildren(ctx);
  }
}