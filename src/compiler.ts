import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'
import { ArmLangLexer } from './antlr4/ArmLangLexer';
import { ArmLangParser, ProgramContext, } from './antlr4/ArmLangParser';
import { GlobalScope, AbstractArmVisitor, TemplateWriter, resolvePath } from './visitors/common';
import { ScopePopulatorVisitor } from './visitors/scopepopulator';
import { ScopeCheckVisitor } from './visitors/scopecheck';
import { DependencyBuilderVisitor } from './visitors/dependencybuilder';
import { TemplateVisitor } from './visitors/template';
import fs from 'fs';
import { ModuleImportVisitor } from './visitors/moduleimport';
import path from 'path';
import { Dictionary } from 'lodash';
import { DependencyNode, findDependencyCycle, getDependencyOrder } from './dependencies';

export class ArmLangCompiler {
  private programCache: Dictionary<ProgramContext> = {};

  transpile(filePath: string, writer: TemplateWriter) {
    filePath = path.resolve(filePath);

    const modules = this.buildModuleDependencyGraph(filePath);
    for (const moulePath of Object.keys(modules)) {
      const cycle = findDependencyCycle(moulePath, modules);
      if (cycle) {
        throw new Error(`Found cyclic module dependency (${moulePath} -> ${cycle.join(' -> ')})`);
      }
    }
    
    const externalVisitors: Dictionary<TemplateVisitor> = {};
    for (const modulePath of getDependencyOrder(modules)) {
      const scope = new GlobalScope(modulePath, modulePath !== filePath);

      const templateVisitor = new TemplateVisitor(scope, writer, externalVisitors);
      visitWithErrorHandling(scope, this.programCache[modulePath], new ScopePopulatorVisitor(scope));
      visitWithErrorHandling(scope, this.programCache[modulePath], new ScopeCheckVisitor(scope));
      visitWithErrorHandling(scope, this.programCache[modulePath], new DependencyBuilderVisitor(scope));
      visitWithErrorHandling(scope, this.programCache[modulePath], templateVisitor);

      externalVisitors[modulePath] = templateVisitor;
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
      let input;
      try {
        input = fs.readFileSync(filePath, { encoding: 'utf8' });
      } catch {
        throw new Error(`Unable to load module '${filePath}'.`);
      }

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
    const scope = new GlobalScope(inputPath, isModuleImport);
    const visitor = new ModuleImportVisitor(scope);
    visitWithErrorHandling(scope, program, visitor);
  
    const parentPath = path.dirname(inputPath);
    const output = [];
    for (const discoveredPath of visitor.discoveredPaths) {
      output.push(resolvePath(parentPath, discoveredPath));
    }
  
    return output;
  }
}

function visitWithErrorHandling(scope: GlobalScope, context: ProgramContext, visitor: AbstractArmVisitor) {
  context.accept(visitor);
  if (scope.errors.length > 0) {
    for (const error of scope.errors) {
      console.error(error.message);
    }

    throw new Error(`Parsing failed: \n${scope.errors.map(e => e.message).join('\n')}`);
  }
}