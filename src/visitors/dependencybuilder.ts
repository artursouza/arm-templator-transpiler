import { ProgramContext, ResourceContext, OutputDeclContext, IdentifierCallContext, ModuleContext, VariableContext } from '../antlr4/ArmLangParser';
import { AbstractArmVisitor, Scope } from './common';
import { Dictionary } from 'lodash';
import { findDependencyCycle, buildDependencyGraph } from '../dependencies';

export class DependencyBuilderVisitor extends AbstractArmVisitor {
  private currentScope: Scope = this.globalScope;
  private scopeIdentifier?: string;
  private scopeDependencies?: Dictionary<string[]>;

  detectCycles(scope: Scope) {
    for (const identifier of Object.keys(scope.dependencies)) {
      const cycle = findDependencyCycle(identifier, identifier, scope.dependencies, new Set<string>());
      if (cycle) {
        this.addError(`Found cyclic dependency (${identifier} -> ${cycle.join(' -> ')})`, scope.identifiers[identifier]);
      }
    }
  }

  visitProgram(ctx: ProgramContext) {
    this.scopeDependencies = {};

    this.visitChildren(ctx);

    this.globalScope.dependencies = buildDependencyGraph(Object.keys(this.globalScope.identifiers), this.scopeDependencies);

    this.detectCycles(this.globalScope);

    for (const module of Object.keys(this.globalScope.modules)) {
      const scope = this.globalScope.modules[module];

      this.detectCycles(scope);
    }
  }

  visitModule(ctx: ModuleContext) {
    const identifier = ctx.Identifier().text;
    const oldScope = this.currentScope;
    const oldIdentifier = this.scopeIdentifier;
    const oldDependencies = this.scopeDependencies;
    
    this.currentScope = this.globalScope.modules[identifier];
    this.scopeIdentifier = undefined;
    this.scopeDependencies = {};

    this.visitChildren(ctx);

    this.currentScope.dependencies = buildDependencyGraph(Object.keys(this.currentScope.identifiers), this.scopeDependencies);
    this.currentScope = oldScope;
    this.scopeIdentifier = oldIdentifier;
    this.scopeDependencies = oldDependencies;
  }

  visitResource(ctx: ResourceContext) {
    const oldIdentifier = this.scopeIdentifier;
    this.scopeIdentifier = ctx.Identifier(1).text;

    this.visitChildren(ctx);

    this.scopeIdentifier = oldIdentifier;
  }

  visitVariable(ctx: VariableContext) {
    const oldIdentifier = this.scopeIdentifier;
    this.scopeIdentifier = ctx.Identifier().text;

    this.visitChildren(ctx);

    this.scopeIdentifier = oldIdentifier;
  }

  visitOutputDecl(ctx: OutputDeclContext) {
    const oldIdentifier = this.scopeIdentifier;
    this.scopeIdentifier = undefined;

     this.visitChildren(ctx);

    this.scopeIdentifier = oldIdentifier;
  }

  visitIdentifierCall(ctx: IdentifierCallContext) {
    const identifier = ctx.Identifier().text;

    if (this.scopeIdentifier === undefined || this.scopeDependencies === undefined) {
      return;
    }
    
    const dependencies = this.scopeDependencies[identifier] || [];
    if (dependencies.indexOf(this.scopeIdentifier) === -1) {
      this.scopeDependencies[identifier] = [...dependencies, this.scopeIdentifier];
    }
  }
}