import { ResourceContext, InputDeclContext, TypeContext, ModuleContext, VariableContext } from '../antlr4/ArmLangParser';
import { AbstractArmVisitor, Scope, ModuleScope } from './common';

export class ScopePopulatorVisitor extends AbstractArmVisitor {
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