import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'
import { ArmLangLexer } from './antlr4/ArmLangLexer';
import { ArmLangParser, ProgramContext, } from './antlr4/ArmLangParser';
import { GlobalScope, AbstractArmVisitor, TemplateWriter } from './visitors/common';
import { ScopePopulatorVisitor } from './visitors/scopepopulator';
import { ScopeCheckVisitor } from './visitors/scopecheck';
import { DependencyBuilderVisitor } from './visitors/dependencybuilder';
import { TemplateGeneratorVisitor } from './visitors/templategenerator';
import fs from 'fs';
import { ModuleImportVisitor } from './visitors/moduleimport';
import path from 'path';
import { Dictionary } from 'lodash';
import { DependencyNode, findDependencyCycle } from './dependencies';

export function execute(filePath: string, writer: TemplateWriter) {
  filePath = path.resolve(filePath);

  const modules = buildModuleDependencyGraph(filePath);
  for (const moulePath of Object.keys(modules)) {
    const cycle = findDependencyCycle(moulePath, moulePath, modules, new Set<string>());
    if (cycle) {
      throw new Error(`Found cyclic module dependency (${moulePath} -> ${cycle.join(' -> ')})`);
    }
  }

  const fileData = fs.readFileSync(filePath, { encoding: 'utf8' });

  const chars = new ANTLRInputStream(fileData);
  const lexer = new ArmLangLexer(chars);
  const tokens  = new CommonTokenStream(lexer);
  const parser = new ArmLangParser(tokens);
  const tree = parser.program();
  
  visit(tree, writer);
}

function buildModuleDependencyGraph(startPath: string): Dictionary<DependencyNode> {
  const output = new DependencyNode();
  const visited: Dictionary<DependencyNode> = {};

  visited[startPath] = output;

  const toVisit = [startPath];
  while (toVisit.length > 0) {
    const currentPath = toVisit.shift() as string;
    const dependencies = findModuleDependencies(currentPath);

    for (const dependency in dependencies) {
      if (!visited[dependency]) {
        visited[dependency] = new DependencyNode();
        toVisit.push(dependency);
      }

      visited[currentPath].children[dependency] = visited[dependency];
    }
  }

  return visited;
}

function findModuleDependencies(inputPath: string): string[] {
  const input = fs.readFileSync(inputPath, { encoding: 'utf8' });

  const chars = new ANTLRInputStream(input);
  const lexer = new ArmLangLexer(chars);
  const tokens  = new CommonTokenStream(lexer);
  const parser = new ArmLangParser(tokens);
  const program = parser.program();

  const visitor = new ModuleImportVisitor();
  visitor.visit(program);

  const parentPath = path.dirname(inputPath);
  const output = [];
  for (const discoveredPath of visitor.discoveredPaths) {
    if (path.isAbsolute(discoveredPath)) {
      output.push(path.resolve(discoveredPath));
    } else {
      output.push(path.resolve(parentPath, discoveredPath));
    }
  }

  return output;
}

function visit(context: ProgramContext, writer: TemplateWriter) {
  const scope = new GlobalScope(false);
  const visitors: AbstractArmVisitor[] = [
    new ScopePopulatorVisitor(scope),
    new ScopeCheckVisitor(scope),
    new DependencyBuilderVisitor(scope),
    new TemplateGeneratorVisitor(scope, writer),
  ];

  for (const visitor of visitors) {
    context.accept(visitor);
    if (scope.errors.length > 0) {
      for (const error of scope.errors) {
        console.error(error.message);
      }

      throw new Error(`Parsing failed: \n${scope.errors.map(e => e.message).join('\n')}`);
    }
  }
}