import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ArmLangVisitor } from '../antlr4/ArmLangVisitor';
import { Dictionary } from 'lodash';
import { Token } from 'antlr4ts';

export abstract class Scope {
  public inputs: Dictionary<string> = {};
  public resources: string[] = [];
  public identifiers: Dictionary<Token> = {};
  public dependencies: Dictionary<string[]> = {};
}

export class GlobalScope extends Scope {
  public errors: Error[] = [];
  public modules: Dictionary<ModuleScope> = {};
}

export class ModuleScope extends Scope {
  constructor(external: boolean) {
    super();
    this.external = external;
  }

  public external: boolean;
}

export abstract class AbstractArmVisitor extends AbstractParseTreeVisitor<void> implements ArmLangVisitor<void> {
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

export interface TemplateWriter {
  write(template: any): void;
}