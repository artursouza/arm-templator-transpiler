import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'
import { ArmLangLexer } from './antlr4/ArmLangLexer';
import { ArmLangParser, ProgramContext, } from './antlr4/ArmLangParser';
import { GlobalScope, AbstractArmVisitor, TemplateWriter } from './visitors/common';
import { ScopePopulatorVisitor } from './visitors/scopepopulator';
import { ScopeCheckVisitor } from './visitors/scopecheck';
import { DependencyBuilderVisitor } from './visitors/DependencyBuilder';
import { TemplateGeneratorVisitor } from './visitors/templategenerator';

export function execute(input: string, writer: TemplateWriter) {
  const chars = new ANTLRInputStream(input);
  const lexer = new ArmLangLexer(chars);
  const tokens  = new CommonTokenStream(lexer);
  const parser = new ArmLangParser(tokens);
  const tree = parser.program();
  
  visit(tree, writer);
}

function visit(context: ProgramContext, writer: TemplateWriter) {
  const scope = new GlobalScope();
  const visitors: AbstractArmVisitor[] = [
    new ScopePopulatorVisitor(scope),
    new ScopeCheckVisitor(scope),
    new DependencyBuilderVisitor(scope),
    new TemplateGeneratorVisitor(scope, writer),
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