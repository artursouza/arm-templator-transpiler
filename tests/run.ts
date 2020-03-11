import 'mocha';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { buildAst } from '../src/execute';
import { printJsModule } from '../src/printer';
import { renderTemplate } from './templatedeployer';

function expectEqualIgnoringLineEndings(actual: string, expected: string) {
  actual = actual.replace(/\r/g, '');
  expected = expected.replace(/\r/g, '');

  expect(actual).to.equal(expected);
}

function testAstGeneration(input: string, output: string) {
  input = path.resolve(__dirname, input);
  output = path.resolve(__dirname, output);

  const inputData = fs.readFileSync(input, { encoding: 'utf8' });
  const outputData = fs.readFileSync(output, { encoding: 'utf8' })

  const program = buildAst(inputData);
  const jsModule = printJsModule(program);

  //fs.writeFileSync(output, jsModule, {encoding:'utf8'});
  
  expectEqualIgnoringLineEndings(jsModule, outputData);
}

function testTemplateGeneration(input: string, output: string) {
  input = path.resolve(__dirname, input);
  output = path.resolve(__dirname, output);

  const inputData = fs.readFileSync(input, { encoding: 'utf8' });
  const outputData = fs.readFileSync(output, { encoding: 'utf8' });

  const template = renderTemplate(inputData);

  //fs.writeFileSync(output, template, {encoding:'utf8'});

  expectEqualIgnoringLineEndings(template, outputData);
}

describe('AST generation', () => {
  it('basic', () => testAstGeneration('./basic.arm', './basic.js'));
});

describe('Template generation', () => {
  it('basic', () => testTemplateGeneration('./basic.arm', './basic.json'));
});