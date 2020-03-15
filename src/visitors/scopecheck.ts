import { IdentifierCallContext, ModuleContext } from '../antlr4/ArmLangParser';
import { AbstractArmVisitor, Scope } from './common';

export class ScopeCheckVisitor extends AbstractArmVisitor {
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