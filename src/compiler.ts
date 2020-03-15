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

export class ArmLangCompiler {
  private programCache: Dictionary<ProgramContext> = {};

  transpile(filePath: string, writer: TemplateWriter) {
    filePath = path.resolve(filePath);

    const modules = this.buildModuleDependencyGraph(filePath);
    for (const moulePath of Object.keys(modules)) {
      const cycle = findDependencyCycle(moulePath, moulePath, modules, new Set<string>());
      if (cycle) {
        throw new Error(`Found cyclic module dependency (${moulePath} -> ${cycle.join(' -> ')})`);
      }
    }

    visit(this.programCache[filePath], writer);
  }

  private resolvePath(parentPath: string, filePath: string) {
    if (path.isAbsolute(filePath)) {
      return path.resolve(filePath);
    } else {
      return path.resolve(parentPath, filePath);
    }
  }

  private buildModuleDependencyGraph(startPath: string): Dictionary<DependencyNode> {
    const output = new DependencyNode();
    const visited: Dictionary<DependencyNode> = {};
  
    visited[startPath] = output;
  
    const toVisit = [startPath];
    while (toVisit.length > 0) {
      const currentPath = toVisit.shift() as string;
      const dependencies = this.findModuleDependencies(currentPath, currentPath !== startPath);
  
      for (const dependency of dependencies) {
        if (!visited[dependency]) {
          visited[dependency] = new DependencyNode();
          toVisit.push(dependency);
        }
  
        visited[currentPath].children[dependency] = visited[dependency];
      }
    }
  
    return visited;
  }

  private loadFile(filePath: string) {
    filePath = path.resolve(filePath);

    if (!this.programCache[filePath]) {
      const input = fs.readFileSync(filePath, { encoding: 'utf8' });

      const chars = new ANTLRInputStream(input);
      const lexer = new ArmLangLexer(chars);
      const tokens  = new CommonTokenStream(lexer);
      const parser = new ArmLangParser(tokens);
      this.programCache[filePath] = parser.program();
    }

    return this.programCache[filePath];
  }
  
  private findModuleDependencies(inputPath: string, isModuleImport: boolean): string[] {
    const program = this.loadFile(inputPath);
    const visitor = new ModuleImportVisitor(new GlobalScope(isModuleImport));
    visitor.visit(program);
  
    const parentPath = path.dirname(inputPath);
    const output = [];
    for (const discoveredPath of visitor.discoveredPaths) {
      output.push(this.resolvePath(parentPath, discoveredPath));
    }
  
    return output;
  }
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