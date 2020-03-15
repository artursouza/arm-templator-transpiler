import fs from 'fs';
import { argv } from 'process';
import path from 'path';
import { ArmLangCompiler } from '../src/compiler';
import { TemplateStringWriter } from '../src/templatestringwriter';

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
recompile(filePath);
fs.watchFile(filePath, (cur, prev) => {
  recompile(filePath);
});

function recompile(inputFile: string) {
  try {
    console.clear();
    console.log('Compiling...');

    const writer = new TemplateStringWriter();
    const compiler = new ArmLangCompiler();
    compiler.transpile(inputFile, writer);

    const output = writer.read();
    fs.writeFileSync(outputfilePath, output, {encoding:'utf8'});

    console.clear();
    console.log('Compiled');
  } catch (e) {
    console.clear();
    console.log('Error compiling:');
    console.error(e);
  }
}