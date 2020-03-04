import 'mocha';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { buildAst } from '../src/execute';
import { printProgram } from '../src/printer';
import { inspect } from 'util';

function executeTest(input: string, output: string) {
  input = path.resolve(__dirname, input);
  output = path.resolve(__dirname, output);

  const inputData = fs.readFileSync(input, { encoding: 'utf8' });
  const outputData = fs.readFileSync(output, { encoding: 'utf8' });

  const program = buildAst(inputData);
  
  const stream: string[] = [];
  printProgram(program, stream);

  //fs.writeFileSync(output, stream.join('\n'), {encoding:'utf8'});
  
  expect(stream.join('\n')).to.equal(outputData);
}

describe('AST generation', () => {
  it('basic', () => executeTest('./basic.arm', './basic.js'));
});