import { Dictionary } from "lodash";

export class DependencyNode {
  public readonly children: Dictionary<DependencyNode> = {};
}

export function buildDependencyGraph(identifiers: string[], dependencies: Dictionary<string[]>) {
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

export function invert(nodes: Dictionary<DependencyNode>) {
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

export function findDependencyCycle(originalIdentifier: string, identifier: string, nodes: Dictionary<DependencyNode>, visited: Set<string>): string[] | undefined {
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