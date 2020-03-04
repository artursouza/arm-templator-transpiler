import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'
import { ArmLangLexer } from './antlr4/ArmLangLexer';
import { ArmLangParser, } from './antlr4/ArmLangParser';
import { visit } from './visitor';

export function buildAst(input: string) {
  const chars = new ANTLRInputStream(input);
  const lexer = new ArmLangLexer(chars);
  const tokens  = new CommonTokenStream(lexer);
  const parser = new ArmLangParser(tokens);
  const tree = parser.program();
  
  return visit(tree);
}