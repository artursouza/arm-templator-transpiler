import { ProgramContext, ResourceContext, OutputDeclContext, IdentifierCallContext, ModuleContext, VariableContext } from '../antlr4/ArmLangParser';
import { AbstractArmVisitor, Scope } from './common';

export class DependencyBuilderVisitor extends AbstractArmVisitor {
  private currentScope: Scope = this.globalScope;
  private currentIdentifier?: string;

  findDependencyCycle(originalIdentifier: string, identifier: string, scope: Scope, visited: Set<string>): string[] | undefined {
    if (!scope.dependencies[identifier]) {
      return;
    }
  
    for (const dependency of scope.dependencies[identifier]) {
      if (visited.has(dependency)) {
        continue;
      }
  
      if (dependency === originalIdentifier) {
        return [originalIdentifier];
      }
  
      visited.add(dependency);
      const result = this.findDependencyCycle(originalIdentifier, dependency, scope, visited);
      if (result) {
        return [dependency, ...result];
      }
    }
  }

  detectCycles(scope: Scope) {
    for (const identifier of Object.keys(scope.dependencies)) {
      const cycle = this.findDependencyCycle(identifier, identifier, scope, new Set<string>());
      if (cycle) {
        this.addError(`Found cyclic dependency (${identifier} -> ${cycle.join(' -> ')})`, scope.identifiers[identifier]);
      }
    }
  }

  visitProgram(ctx: ProgramContext) {
    this.visitChildren(ctx);

    this.detectCycles(this.globalScope);

    for (const module of Object.keys(this.globalScope.modules)) {
      const scope = this.globalScope.modules[module];

      this.detectCycles(scope);
    }
  }

  visitModule(ctx: ModuleContext) {
    const identifier = ctx.Identifier().text;
    const oldScope = this.currentScope;
    const oldIdentifier = this.currentIdentifier;
    
    this.currentScope = this.globalScope.modules[identifier];
    this.currentIdentifier = undefined;

    this.visitChildren(ctx);

    this.currentScope = oldScope;
    this.currentIdentifier = oldIdentifier;
  }

  visitResource(ctx: ResourceContext) {
    const oldIdentifier = this.currentIdentifier;
    this.currentIdentifier = ctx.Identifier(1).text;

    this.visitChildren(ctx);

    this.currentIdentifier = oldIdentifier;
  }

  visitVariable(ctx: VariableContext) {
    const oldIdentifier = this.currentIdentifier;
    this.currentIdentifier = ctx.Identifier().text;

    this.visitChildren(ctx);

    this.currentIdentifier = oldIdentifier;
  }

  visitOutputDecl(ctx: OutputDeclContext) {
    const oldIdentifier = this.currentIdentifier;
    this.currentIdentifier = ctx.Identifier().text;

    this.visitChildren(ctx);

    this.currentIdentifier = oldIdentifier;
  }

  visitIdentifierCall(ctx: IdentifierCallContext) {
    const identifier = ctx.Identifier().text;

    if (!this.currentIdentifier) {
      throw new Error('Parsing failed: Identifier scope has not been set');
    }
    
    const dependencies = this.globalScope.dependencies[identifier] || [];
    if (dependencies.indexOf(this.currentIdentifier) === -1) {
      this.globalScope.dependencies[identifier] = [...dependencies, this.currentIdentifier];
    }
  }
}