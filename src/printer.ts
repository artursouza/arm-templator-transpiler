import { ProgramAst, Ast, FunctionCallAst, ObjectAst, StringAst, NumberAst, ArrayAst, IdentifierAst } from "./ast";

function renderFunction(fnCall: FunctionCallAst) {
  return `d.call('${fnCall.name.name}', [${fnCall.params.map(renderProperty).join(', ')}])`
}

function renderObject(object: ObjectAst) {
  const output: string[] = [];
  for (const property of object.properties) {
    output.push(`${property.name.name}: ${renderProperty(property.value)}`);
  }

  return `{${output.join(', ')}}`;
}

function renderArray(array: ArrayAst) {
  const output = array.value.map(renderProperty);

  return `[${output.join(', ')}]`;
}

function renderProperty(property: Ast): any {
  if (property instanceof StringAst) {
    return property.value;
  }

  if (property instanceof NumberAst) {
    return property.value;
  }

  if (property instanceof ObjectAst) {
    return renderObject(property);
  }

  if (property instanceof ArrayAst) {
    return renderArray(property);
  }

  if (property instanceof FunctionCallAst) {
    return renderFunction(property);
  }

  if (property instanceof IdentifierAst) {
    return `d.identifier('${property.name}')`;
  }

  throw new Error(`Encountered unexpected ${typeof property}`);
}

export function printJsModule(program: ProgramAst) {
  const stream: string[] = [];

  stream.push(`"use strict";`);
  stream.push(`Object.defineProperty(exports, "__esModule", { value: true });`);
  stream.push(`function render(d) {`);

  for (const input of program.inputs) {
    stream.push(`d.input('${input.name.name}', '${input.type.name}');`);
  }

  for (const resource of program.resources) {
    stream.push(`d.resource('${resource.provider.name}', ${renderProperty(resource.type)}, '${resource.name.name}', ${renderProperty(resource.properties)});`)
  }

  for (const output of program.outputs) {
    stream.push(`d.output('${output.name.name}', ${renderProperty(output.value)});`);
  }

  stream.push(`return d.render();`);
  stream.push(`}`);

  stream.push(`exports.render = render`);

  return stream.join('\n');
}