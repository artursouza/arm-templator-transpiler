import fs from 'fs';
import { argv } from 'process';
import path from 'path';
import { renderTemplate } from './templatedeployer';

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

recompile(fileName, outputFileName);
fs.watchFile(fileName, (cur, prev) => {
  recompile(fileName, outputFileName);
});

function recompile(inputFile: string, outputFile: string) {
  try {
    console.clear();
    console.log('Compiling...');
    const input = fs.readFileSync(inputFile, { encoding: 'utf8' });

    const template = renderTemplate(input);

    fs.writeFileSync(outputFile, template, {encoding:'utf8'});
    console.clear();
    console.log('Compiled');
  } catch (e) {
    console.clear();
    console.log('Error compiling:');
    console.error(e);
  }
}