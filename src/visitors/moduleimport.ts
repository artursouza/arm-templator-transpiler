import { ResourceContext } from '../antlr4/ArmLangParser';
import { parseAstString, parseModuleTypeString } from './common';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ArmLangVisitor } from '../antlr4/ArmLangVisitor';

export class ModuleImportVisitor extends AbstractParseTreeVisitor<void> implements ArmLangVisitor<void> {
  public discoveredPaths: Set<string> = new Set<string>();

  defaultResult(): void { }

  visitResource(ctx: ResourceContext) {
    if (ctx.Identifier(0).text !== 'mod') {
      return;
    }

    const typeString = parseAstString(ctx.String().text);
    const { name, path } = parseModuleTypeString(typeString);

    if (path) {
      this.discoveredPaths.add(path);
    }
  }
}