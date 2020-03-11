import { ResourceAst, IdentifierAst, ObjectAst, ObjectPropertyAst, NumberAst, StringAst, ArrayAst, FunctionCallAst, ProgramAst, Ast, TypeAst, InputDeclAst, OutputDeclAst, AccessAst } from './ast';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ArmLangVisitor } from './antlr4/ArmLangVisitor';
import { ProgramContext, SectionContext, ResourceContext, ObjectContext, ObjectPropertyContext, PropertyContext, ArrayContext, FunctionCallContext, InputDeclContext, OutputDeclContext, TypeContext, IdentifierCallContext, PropertyTailContext, ModuleContext, VariableContext } from './antlr4/ArmLangParser';
import { Dictionary } from 'lodash';
import { RuleContext, Token } from 'antlr4ts';
import { inspect } from 'util';

function findDependencyCycle(originalIdentifier: string, identifier: string, scope: Scope, visited: Set<string>): string[] | undefined {
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
    const result = findDependencyCycle(originalIdentifier, dependency, scope, visited);
    if (result) {
      return [dependency, ...result];
    }
  }
}

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

  detectCycles(scope: Scope) {
    for (const identifier of Object.keys(scope.dependencies)) {
      const cycle = findDependencyCycle(identifier, identifier, scope, new Set<string>());
      if (cycle) {
        this.addError(`Found cyclic dependency (${cycle.join(' -> ')})`, scope.identifiers[identifier]);
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

class ArmAstVisitor extends AbstractParseTreeVisitor<Ast> implements ArmLangVisitor<Ast> {
  defaultResult(): number {
    return 0
  }

  visitProgram(ctx: ProgramContext) {
    const inputs = [];
    const resources = [];
    const outputs = [];

    for (const child of ctx.children || []) {
      const section = this.visit(child);

      if (section instanceof InputDeclAst) {
        inputs.push(section);
        continue;
      }

      if (section instanceof ResourceAst) {
        resources.push(section);
        continue;
      }

      if (section instanceof OutputDeclAst) {
        outputs.push(section);
        continue;
      }
    }

    return new ProgramAst(inputs, resources, outputs);
  }
  
  visitSection(ctx: SectionContext) {
    return this.visit(ctx.getChild(0));
  }

  visitInputDecl(ctx: InputDeclContext) {
    const name = new IdentifierAst(ctx.Identifier().text);
    const type = this.visitType(ctx.type());

    return new InputDeclAst(name, type);
  }

  visitOutputDecl(ctx: OutputDeclContext) {
    const name = new IdentifierAst(ctx.Identifier().text);
    const value = this.visitProperty(ctx.property());

    return new OutputDeclAst(name, value);
  }
  
  visitResource(ctx: ResourceContext) {
    const provider = new IdentifierAst(ctx.getChild(1).text);
    const type = new StringAst(ctx.String().toString());
    const name = new IdentifierAst(ctx.getChild(3).text);
    const object = this.visit(ctx.getChild(4)) as ObjectAst;

    return new ResourceAst(provider, type, name, object);
  }

  visitType(ctx: TypeContext) {
    return new TypeAst(ctx.text);
  }

  visitObject(ctx: ObjectContext) {
    const properties = ctx.objectProperty().map(prop => this.visitObjectProperty(prop));

    return new ObjectAst(properties);
  }

  visitObjectProperty(ctx: ObjectPropertyContext) {
    const name = new IdentifierAst(ctx.Identifier().text);
    const prop = this.visitProperty(ctx.property());
    
    return new ObjectPropertyAst(name, prop);
  }

  visitProperty(ctx: PropertyContext) {
    const numberText = ctx.Number()?.text;
    if (numberText !== undefined) {
      return new NumberAst(parseInt(numberText));
    }

    const stringText = ctx.String()?.text;
    if (stringText !== undefined) {
      return new StringAst(stringText);
    }

    const propertyTail = ctx.propertyTail();
    if (propertyTail && propertyTail.childCount > 0) {
      const parentCtx = ctx.identifierCall() || ctx.functionCall();

      if (!parentCtx) {
        throw new Error('Parsing failed: Unable to find parent');
      }

      const child = this.visit(propertyTail);
      const parent = this.visit(parentCtx);
      return new AccessAst(parent, child);
    }
    
    const identifierText = ctx.identifierCall()?.Identifier().text;
    if (identifierText !== undefined) {
      return new IdentifierAst(identifierText);
    }

    return this.visit(ctx.getChild(0));
  }

  visitArray(ctx: ArrayContext) {
    const output = [];

    for (const prop of ctx.property() || []) {
      output.push(this.visit(prop));
    }

    return new ArrayAst(output);
  }

  visitFunctionCall(ctx: FunctionCallContext) {
    const name = new IdentifierAst(ctx.Identifier().text);
    const params = ctx.property().map(prop => this.visitProperty(prop));

    return new FunctionCallAst(name, params);
  }

  visitIdentifierCall(ctx: IdentifierCallContext) {
    return new IdentifierAst(ctx.Identifier().text);
  }

  visitPropertyTail(ctx: PropertyTailContext): Ast {
    const propertyTail = ctx.propertyTail();
    const parentCtx = ctx.propertyCall() || ctx.functionCall();

    if (!parentCtx) {
      throw new Error('Parsing failed: Unable to find parent');
    }

    if (!propertyTail) {
      throw new Error('Parsing failed: unable to find tail');
    }

    if (propertyTail.childCount === 0) {
      return this.visit(parentCtx);
    }

    const child = this.visit(propertyTail);
    const parent = this.visit(parentCtx);
    return new AccessAst(parent, child);
  }
}

export function visit(context: ProgramContext) {
  const scope = new GlobalScope();
  const visitors: AbstractArmVisitor[] = [
    new ScopePopulatorVisitor(scope),
    new ScopeCheckVisitor(scope),
    new DependencyBuilderVisitor(scope),
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

  const visitor = new ArmAstVisitor();
  return context.accept(visitor) as ProgramAst;
}