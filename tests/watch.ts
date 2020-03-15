import fs from 'fs';
import { argv } from 'process';
import path from 'path';
import { ArmLangCompiler } from '../src/compiler';
import { TemplateWriter } from '../src/visitors/common';

class TemplateFileWriter implements TemplateWriter {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  write(template: any): void {
    const templateJson = JSON.stringify(template, null, 2);
    fs.writeFileSync(this.filePath, templateJson, {encoding:'utf8'});
  }
}

if (!argv[2]) {
  throw new Error(`Please supply a file to watch.`);
}

const filePath = path.resolve(argv[2]);
if (path.extname(filePath) !== '.arm') {
  throw new Error(`File ${filePath} must have extension '.arm'.`);
}
const outputfilePath = filePath.slice(0, -4) + '.json';

const stat = fs.statSync(filePath);
if (!stat.isFile()) {
  throw new Error(`Unable to watch file ${filePath}.`);
}
const writer = new TemplateFileWriter(outputfilePath);

recompile(filePath, writer);
fs.watchFile(filePath, (cur, prev) => {
  recompile(filePath, writer);
});

function recompile(inputFile: string, writer: TemplateWriter) {
  try {
    console.clear();
    console.log('Compiling...');

    const compiler = new ArmLangCompiler();
    compiler.transpile(inputFile, writer);

    console.clear();
    console.log('Compiled');
  } catch (e) {
    console.clear();
    console.log('Error compiling:');
    console.error(e);
  }
}