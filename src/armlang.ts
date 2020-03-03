import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'
import { ArmLangLexer } from './antlr4/ArmLangLexer';
import { ArmLangParser, } from './antlr4/ArmLangParser';
import { ArmVisitor } from './visitor';
import fs from 'fs';

const input = fs.readFileSync(`${__dirname}/example.arm`, {encoding: 'utf8'});
const chars = new ANTLRInputStream(input);
const lexer = new ArmLangLexer(chars);
const tokens  = new CommonTokenStream(lexer);
const parser = new ArmLangParser(tokens);
const tree = parser.program();

const visitor = new ArmVisitor();
tree.accept(visitor);