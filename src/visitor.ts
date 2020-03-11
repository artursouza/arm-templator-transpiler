import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ArmLangVisitor } from './antlr4/ArmLangVisitor';
import { ProgramContext, SectionContext, ResourceContext, ObjectContext, ObjectPropertyContext, PropertyContext, ArrayContext, FunctionCallContext, InputDeclContext, OutputDeclContext, TypeContext, IdentifierCallContext, PropertyTailContext, ModuleContext, VariableContext } from './antlr4/ArmLangParser';
import { Dictionary } from 'lodash';
import { RuleContext, Token, ConsoleErrorListener } from 'antlr4ts';
import { inspect } from 'util';

abstract class Scope {
  public inputs: Dictionary<string> = {};
  public resources: string[] = [];
  public identifiers: Dictionary<Token> = {};
  public dependencies: Dictionary<string[]> = {};
}

class GlobalScope extends Scope {
  public errors: Error[] = [];
  public modules: Dictionary<ModuleScope> = {};
}

class ModuleScope extends Scope {
  constructor(external: boolean) {
    super();
    this.external = external;
  }

  public external: boolean;
}

abstract class AbstractArmVisitor extends AbstractParseTreeVisitor<void> implements ArmLangVisitor<void> {
  constructor(globalScope: GlobalScope) {
    super();
    this.globalScope = globalScope;
  }

  protected globalScope: GlobalScope;

  defaultResult(): void { }

  protected addError(message: string, token: Token) {
    const error = new Error(`[${token.line}:${token.charPositionInLine}] ${message}`);
    this.globalScope.errors.push(error);
  }
}

class ScopePopulatorVisitor extends AbstractArmVisitor {
  private currentScope: Scope = this.globalScope;

  visitModule(ctx: ModuleContext) {
    const identifier = ctx.Identifier().text;
    if (this.currentScope.identifiers[identifier]) {
      this.addError(`Identifier '${identifier}' has already been declared.`, ctx.Identifier().symbol);
    }

    const oldScope = this.currentScope;

    const external = ctx.start.text === 'export';

    const moduleScope = new ModuleScope(external);
    this.globalScope.modules[identifier] = moduleScope;
    this.currentScope = moduleScope;

    this.visitChildren(ctx);

    this.currentScope = oldScope;
  }

  visitResource(ctx: ResourceContext) {
    this.visitChildren(ctx);

    const identifier = ctx.Identifier(1).text;

    if (this.currentScope.identifiers[identifier]) {
      this.addError(`Identifier '${identifier}' has already been declared.`, ctx.Identifier(1).symbol);
    }

    this.currentScope.resources.push(identifier);
    this.currentScope.identifiers[identifier] = ctx.Identifier(1).symbol;
  }

  visitVariable(ctx: VariableContext) {
    const identifier = ctx.Identifier().text;

    if (this.currentScope.identifiers[identifier]) {
      this.addError(`Identifier '${identifier}' has already been declared.`, ctx.Identifier().symbol);
    }

    this.currentScope.identifiers[identifier] = ctx.Identifier().symbol;
  }

  visitInputDecl(ctx: InputDeclContext) {
    this.visitChildren(ctx);

    const identifier = ctx.Identifier().text;
    if (this.currentScope.identifiers[identifier]) {
      this.addError(`Identifier '${identifier}' has already been declared.`, ctx.Identifier().symbol);
    }

    this.currentScope.inputs[identifier] = ctx.type().text;
    this.currentScope.identifiers[identifier] = ctx.Identifier().symbol;
  }

  visitType(ctx: TypeContext) {
    this.visitChildren(ctx);

    switch (ctx.text) {
      case 'string':
      case 'securestring':
      case 'int':
      case 'bool':
      case 'object':
      case 'array':
        return;
      default:
        this.addError(`Unrecognized type '${ctx.text}'`, ctx.start);
    }
  }
}

class ScopeCheckVisitor extends AbstractArmVisitor {
  private currentScope: Scope = this.globalScope;

  visitModule(ctx: ModuleContext) {
    const identifier = ctx.Identifier().text;
    const oldScope = this.currentScope;
    
    this.currentScope = this.globalScope.modules[identifier];

    this.visitChildren(ctx);

    this.currentScope = oldScope;
  }

  visitIdentifierCall(ctx: IdentifierCallContext) {
    this.visitChildren(ctx);

    const identifier = ctx.Identifier();
    if (!this.currentScope.identifiers[identifier.text]) {
      this.addError(`Unrecognized identifier '${identifier}'`, identifier.symbol);
    }
  }
}

class DependencyBuilderVisitor extends AbstractArmVisitor {
  private currentScope: Scope = this.globalScope;
  private currentIdentifier?: string;

  findDependencyCycle(originalIdentifier: string, identifier: string, scope: Scope, visited: Set<string>): string[] | undefined {
    if (!scope.dependencies[identifier]) {
      return;
    }
  
    for (const dependency of scope.dependencies[identifier]) {
      if (visited.has(dependency)) {
        continue;
      }
  
      if (dependency === originalIdentifier) {
        return [originalIdentifier];
      }
  
      visited.add(dependency);
      const result = this.findDependencyCycle(originalIdentifier, dependency, scope, visited);
      if (result) {
        return [dependency, ...result];
      }
    }
  }

  detectCycles(scope: Scope) {
    for (const identifier of Object.keys(scope.dependencies)) {
      const cycle = this.findDependencyCycle(identifier, identifier, scope, new Set<string>());
      if (cycle) {
        this.addError(`Found cyclic dependency (${identifier} -> ${cycle.join(' -> ')})`, scope.identifiers[identifier]);
      }
    }
  }

  visitProgram(ctx: ProgramContext) {
    this.visitChildren(ctx);

    this.detectCycles(this.globalScope);

    for (const module of Object.keys(this.globalScope.modules)) {
      const scope = this.globalScope.modules[module];

      this.detectCycles(scope);
    }
  }

  visitModule(ctx: ModuleContext) {
    const identifier = ctx.Identifier().text;
    const oldScope = this.currentScope;
    const oldIdentifier = this.currentIdentifier;
    
    this.currentScope = this.globalScope.modules[identifier];
    this.currentIdentifier = undefined;

    this.visitChildren(ctx);

    this.currentScope = oldScope;
    this.currentIdentifier = oldIdentifier;
  }

  visitResource(ctx: ResourceContext) {
    const oldIdentifier = this.currentIdentifier;
    this.currentIdentifier = ctx.Identifier(1).text;

    this.visitChildren(ctx);

    this.currentIdentifier = oldIdentifier;
  }

  visitVariable(ctx: VariableContext) {
    const oldIdentifier = this.currentIdentifier;
    this.currentIdentifier = ctx.Identifier().text;

    this.visitChildren(ctx);

    this.currentIdentifier = oldIdentifier;
  }

  visitOutputDecl(ctx: OutputDeclContext) {
    const oldIdentifier = this.currentIdentifier;
    this.currentIdentifier = ctx.Identifier().text;

    this.visitChildren(ctx);

    this.currentIdentifier = oldIdentifier;
  }

  visitIdentifierCall(ctx: IdentifierCallContext) {
    const identifier = ctx.Identifier().text;

    if (!this.currentIdentifier) {
      throw new Error('Parsing failed: Identifier scope has not been set');
    }
    
    const dependencies = this.globalScope.dependencies[identifier] || [];
    if (dependencies.indexOf(this.currentIdentifier) === -1) {
      this.globalScope.dependencies[identifier] = [...dependencies, this.currentIdentifier];
    }
  }
}

export interface TemplateWriter {
  write(template: any): void;
}

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

class TemplateGenerationVisitor extends AbstractArmVisitor {
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
    const dependencyCount: Dictionary<number> = {};

    const resourcesByIdentifier: Dictionary<ResourceContext> = {};
    for (const resourceCtx of resourceCtxts) {
      if (resourceCtx) {
        resourcesByIdentifier[resourceCtx.Identifier(1).text] = resourceCtx;
        dependencyCount[resourceCtx.Identifier(1).text] = 0;
      }
    }

    const variablesByIdentifier: Dictionary<VariableContext> = {};
    for (const variableCtx of variableCtxts) {
      if (variableCtx) {
        variablesByIdentifier[variableCtx.Identifier().text] = variableCtx;
        dependencyCount[variableCtx.Identifier().text] = 0;
      }
    }

    for (const dependency of Object.keys(scope.dependencies)) {
      if (!(resourcesByIdentifier[dependency] || variablesByIdentifier[dependency])) {
        // dependencies also includes inputs - we're only interested in variable and resource
        // dependencies to build the dependency graph
        continue;
      }

      for (const dependent of scope.dependencies[dependency]) {
        if (resourcesByIdentifier[dependent] || variablesByIdentifier[dependent]) {
          dependencyCount[dependent] += 1;
        }
      }
    }

    const dependencyOrder: string[] = [];
    do {
      const orderedKeys = Object.keys(dependencyCount);
      orderedKeys.sort();

      for (const dependency of orderedKeys) {
        if (dependencyCount[dependency] === 0) {
          dependencyOrder.push(dependency);
          delete dependencyCount[dependency];

          const dependents = scope.dependencies[dependency] || [];
          for (const dependent of dependents) {
            if (dependencyCount[dependent]) {
              dependencyCount[dependent] -= 1;
            }
          }
        }
      }
    } while (Object.keys(dependencyCount).length > 0)

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
      
      throw new Error(`Parsing failed: Unresolvable dependency ${dependency}`);
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
    let dependsOn = undefined;
    for (const resource of Object.keys(this.resources)) {
      const resourceDependencies = this.globalScope.dependencies[resource];
      if (resourceDependencies && resourceDependencies.indexOf(identifier) !== -1) {
        const resourceIdExpression = `[resourceId(${this.unescapeExpression(this.resources[resource].type)}, ${this.unescapeExpression(this.resources[resource].name)})]`;
        if (!dependsOn) {
          dependsOn = [];
        }
        dependsOn.push(resourceIdExpression);

        //TODO detect indirect dependencies (through variable)
      }
    }

    const resourceBody = this.visitObject(ctx.object());

    const { apiVersion, fullType } = parseAzrmTypeString(parseAstString(ctx.String().text));
    const resource = {
      apiVersion,
      type: fullType,
      ...resourceBody,
      dependsOn,
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
    if (typeof output === 'string' && (ctx.identifierCall() || ctx.functionCall())) {
      // TODO proper escaping
      return `[${output}]`;
    }

    return output;
  }

  visitFunctionParamProperty(ctx: PropertyContext): any {
    const output = this.visitProperty(ctx);
    if (ctx.String()) {
      // TODO proper escaping
      return `'${output}'`;
    }

    return output;
  }

  unescapeExpression(input: string) {
    // TODO very hacky - fix this!
    if (input.length >= 2 && input[0] === '[' && input[input.length -1] === ']') {
      return input.substring(1, input.length -1);
    } else {
      return `'${input}'`
    }

    return input;
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
        case 'concat':
          const evaluatedValues: any[] = [];
          for (const property of functionCallCtx.property()) {
            const evaluated = this.visitFunctionParamProperty(property);
            if (typeof evaluated !== 'string' && typeof evaluated !== 'number' && typeof evaluated !== 'boolean') {
              throw new Error(`Invalid value passed to concat function`);
            }
            evaluatedValues.push(evaluated);
          }
          return `concat(${evaluatedValues.join(', ')})`
      }

      throw new Error(`Function ${functionName} is not supported in this prototype!`);
    }

    return this.visitChildren(ctx);
  }
}

export function visit(context: ProgramContext, writer: TemplateWriter) {
  const scope = new GlobalScope();
  const visitors: AbstractArmVisitor[] = [
    new ScopePopulatorVisitor(scope),
    new ScopeCheckVisitor(scope),
    new DependencyBuilderVisitor(scope),
    new TemplateGenerationVisitor(scope, writer),
  ];

  for (const visitor of visitors) {
    context.accept(visitor);
    if (scope.errors.length > 0) {
      for (const error of scope.errors) {
        console.error(error.message);
      }

      throw new Error(`Parsing failed: \n${scope.errors.map(e => e.message).join('\n')}`);
    }
  }
}