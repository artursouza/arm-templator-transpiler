import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ArmLangVisitor } from '../antlr4/ArmLangVisitor';
import { Dictionary } from 'lodash';
import { Token } from 'antlr4ts';
import { DependencyNode } from '../dependencies';

export abstract class Scope {
  public inputs: Dictionary<string> = {};
  public resources: string[] = [];
  public identifiers: Dictionary<Token> = {};
  public dependencies: Dictionary<DependencyNode> = {};
}

export class GlobalScope extends Scope {
  constructor(isModuleImport: boolean) {
    super();
    this.isModuleImport = isModuleImport;
  }
  public errors: Error[] = [];
  public modules: Dictionary<ModuleScope> = {};
  public isModuleImport: boolean;
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

export function parseModuleTypeString(type: string) {
  let splitType = type.split('@');
  if (splitType.length > 1) {
    throw new Error(`Unable to parse module type '${type}'`);
  }

  return {
    name: splitType.length === 1 ? splitType[0] : splitType[1],
    path: splitType.length === 1 ? splitType[1] : undefined,
  };
}

export function parseAstString(input: string) {
  return input
    .substring(1, input.length - 1)
    .replace(/\\\'/g, '\'')
    .replace(/\\\\/g, '\\');
}