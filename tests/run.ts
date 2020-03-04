import 'mocha';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { buildAst } from '../src/execute';
import { inspect } from 'util';

function executeTest(input: string, output: string) {
  input = path.resolve(__dirname, input);
  output = path.resolve(__dirname, output);

  const inputData = fs.readFileSync(input, { encoding: 'utf8' });
  const outputData = fs.readFileSync(output, { encoding: 'utf8' });
  
  const generated = inspect(buildAst(inputData), false, 999);
  //fs.writeFileSync(output, generated, {encoding:'utf8'});
  
  expect(generated).to.equal(outputData);
}

describe('AST generation', () => {
  it('basic', () => executeTest('./basic.arm', './basic.ast'));
});