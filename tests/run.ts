import 'mocha';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { ArmLangCompiler } from '../src/compiler';
import { TemplateStringWriter } from '../src/templatestringwriter';

function expectEqualIgnoringLineEndings(actual: string, expected: string) {
  actual = actual.replace(/\r/g, '');
  expected = expected.replace(/\r/g, '');

  expect(actual).to.equal(expected);
}

function testTemplateGeneration(input: string, output: string) {
  input = path.resolve(__dirname, input);
  output = path.resolve(__dirname, output);

  const outputData = fs.readFileSync(output, { encoding: 'utf8' });

  const compiler = new ArmLangCompiler();
  const writer = new TemplateStringWriter();
  compiler.transpile(input, writer);

  //fs.writeFileSync(output, writer.read(), {encoding:'utf8'});

  expectEqualIgnoringLineEndings(writer.read(), outputData);
}

describe('Template generation', () => {
  it('basic', () => testTemplateGeneration('./basic.arm', './basic.json'));
  it('module', () => testTemplateGeneration('./module.arm', './module.json'));
  it('external module', () => testTemplateGeneration('./ext_module.arm', './ext_module.json'));
});