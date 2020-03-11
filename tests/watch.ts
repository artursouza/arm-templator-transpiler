import fs from 'fs';
import { argv } from 'process';
import path from 'path';
import { execute } from '../src/execute';
import { TemplateWriter } from '../src/visitor';

class TemplateFileWriter implements TemplateWriter {
  private readonly fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  write(template: any): void {
    const templateJson = JSON.stringify(template, null, 2);
    fs.writeFileSync(this.fileName, templateJson, {encoding:'utf8'});
  }
}

if (!argv[2]) {
  throw new Error(`Please supply a file to watch.`);
}

const fileName = path.resolve(argv[2]);
if (path.extname(fileName) !== '.arm') {
  throw new Error(`File ${fileName} must have extension '.arm'.`);
}
const outputFileName = fileName.slice(0, -4) + '.json';

const stat = fs.statSync(fileName);
if (!stat.isFile()) {
  throw new Error(`Unable to watch file ${fileName}.`);
}
const writer = new TemplateFileWriter(outputFileName);

recompile(fileName, writer);
fs.watchFile(fileName, (cur, prev) => {
  recompile(fileName, writer);
});

function recompile(inputFile: string, writer: TemplateWriter) {
  try {
    console.clear();
    console.log('Compiling...');
    const input = fs.readFileSync(inputFile, { encoding: 'utf8' });

    execute(input, writer);

    console.clear();
    console.log('Compiled');
  } catch (e) {
    console.clear();
    console.log('Error compiling:');
    console.error(e);
  }
}