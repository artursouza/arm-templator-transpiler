import { ProgramContext, ResourceContext, OutputDeclContext, IdentifierCallContext, ModuleContext, VariableContext } from '../antlr4/ArmLangParser';
import { AbstractArmVisitor, Scope, DependencyNode } from './common';
import { Dictionary } from 'lodash';

function buildDependencyGraph(identifiers: string[], dependencies: Dictionary<string[]>) {
  const graphNodes: Dictionary<DependencyNode> = {};
  for (const identifier of identifiers) {
    graphNodes[identifier] = new DependencyNode();
  }

  for (const dependency of Object.keys(dependencies)) {
    for (const dependent of dependencies[dependency]) {
      if (!graphNodes[dependent]) {
        continue;
      }
      graphNodes[dependent].children[dependency] = graphNodes[dependency];
    }
  }

  return graphNodes;
}

function invert(nodes: Dictionary<DependencyNode>) {
  const invertedNodes: Dictionary<DependencyNode> = {};
  for (const identifier of Object.keys(nodes)) {
    invertedNodes[identifier] = new DependencyNode();
  }

  for (const identifier of Object.keys(nodes)) {
    if (!nodes[identifier]) {
      continue;
    }

    for (const dependency of Object.keys(nodes[identifier].children)) {
      invertedNodes[dependency].children[identifier] = invertedNodes[identifier];
    }
  }

  return invertedNodes;
}

export function getDependencyOrder(nodes: Dictionary<DependencyNode>) {
  const invertedNodes = invert(nodes);

  const dependencyCount: Dictionary<number> = {};
  for (const dependency of Object.keys(nodes)) {
    dependencyCount[dependency] = Object.keys(nodes[dependency].children).length;
  }

  const dependencyOrder: string[] = [];
  do {
    const identifiers = Object.keys(dependencyCount);
    // sort to get a consistent order
    identifiers.sort();

    for (const identifier of identifiers) {
      if (dependencyCount[identifier] === 0) {
        dependencyOrder.push(identifier);
        delete dependencyCount[identifier];

        for (const dependent of Object.keys(invertedNodes[identifier].children)) {
          if (dependencyCount[dependent]) {
            dependencyCount[dependent] -= 1;
          }
        }
      }
    }
  } while (Object.keys(dependencyCount).length > 0)

  return dependencyOrder;
}

function findDependencyCycle(originalIdentifier: string, identifier: string, nodes: Dictionary<DependencyNode>, visited: Set<string>): string[] | undefined {
  const dependencies = nodes[identifier].children;
  for (const dependency of Object.keys(dependencies)) {
    if (visited.has(dependency)) {
      continue;
    }

    if (dependency === originalIdentifier) {
      return [originalIdentifier];
    }

    visited.add(dependency);
    const result = findDependencyCycle(originalIdentifier, dependency, nodes, visited);
    if (result) {
      return [dependency, ...result];
    }
  }
}

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