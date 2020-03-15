import { ResourceContext, InputDeclContext, OutputDeclContext } from '../antlr4/ArmLangParser';
import { parseAstString, parseModuleTypeString, AbstractArmVisitor, GlobalScope } from './common';

export class ModuleImportVisitor extends AbstractArmVisitor {
  public discoveredPaths: Set<string> = new Set<string>();

  visitInputDecl(ctx: InputDeclContext) {
    if (this.globalScope.isModuleImport) {
      this.addError(`Imported module cannot declare inputs`, ctx.Identifier().symbol);
    }
  }

  visitOutputDecl(ctx: OutputDeclContext) {
    if (this.globalScope.isModuleImport) {
      this.addError(`Imported module cannot declare outpus`, ctx.Identifier().symbol);
    }
  }

  visitResource(ctx: ResourceContext) {
    if (ctx.Identifier(0).text !== 'mod') {
      if (this.globalScope.isModuleImport) {
        this.addError(`Imported module cannot declare resources`, ctx.Identifier(0).symbol);
      }

      return;
    }

    const typeString = parseAstString(ctx.String().text);
    const { name, path } = parseModuleTypeString(typeString);

    if (path) {
      this.discoveredPaths.add(path);
    }
  }
}