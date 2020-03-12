import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ArmLangVisitor } from '../antlr4/ArmLangVisitor';
import { Dictionary } from 'lodash';
import { Token } from 'antlr4ts';

export abstract class Scope {
  public inputs: Dictionary<string> = {};
  public resources: string[] = [];
  public identifiers: Dictionary<Token> = {};
  public dependencies: Dictionary<DependencyNode> = {};
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

export class DependencyNode {
  public readonly children: Dictionary<DependencyNode> = {};
}

export abstract class AbstractArmVisitor extends AbstractParseTreeVisitor<void> implements ArmLangVisitor<void> {
  constructor(globalScope: GlobalScope) {
    super();
    this.globalScope = globalScope;
  }

  protected globalScope: GlobalScope;

  defaultResult(): void { }

  protected addError(message: string, token: Token) {
    const error = this.buildError(message, token);
    this.globalScope.errors.push(error);
  }

  protected buildError(message: string, token: Token) {
    return new Error(`[${token.line}:${token.charPositionInLine}] ${message}`);
  }
}

export interface TemplateWriter {
  write(template: any): void;
}