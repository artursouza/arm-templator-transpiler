export abstract class Ast {

}

export class ProgramAst extends Ast {
  inputs: InputDeclAst[]
  resources: ResourceAst[];
  outputs: OutputDeclAst[]
  constructor(inputs: InputDeclAst[], resources: ResourceAst[], outputs: OutputDeclAst[]) {
    super();
    this.inputs = inputs;
    this.resources = resources;
    this.outputs = outputs;
  }
}

export class ResourceAst extends Ast {
  provider: IdentifierAst;
  type: StringAst;
  name: IdentifierAst;
  properties: ObjectAst;
  constructor(provider: IdentifierAst, type: StringAst, name: IdentifierAst, properties: ObjectAst) {
    super();
    this.provider = provider;
    this.type = type;
    this.name = name;
    this.properties = properties;
  }
}

export class IdentifierAst extends Ast {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
}

export class TypeAst extends Ast {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
}

export class InputDeclAst extends Ast {
  name: IdentifierAst;
  type: TypeAst;
  constructor(name: IdentifierAst, type: TypeAst) {
    super();
    this.name = name;
    this.type = type;
  }
}

export class OutputDeclAst extends Ast {
  name: IdentifierAst;
  value: Ast;
  constructor(name: IdentifierAst, value: Ast) {
    super();
    this.name = name;
    this.value = value;
  }
}

export class StringAst extends Ast {
  value: string;
  constructor(value: string) {
    super();
    this.value = value;
  }
}

export class NumberAst extends Ast {
  value: number;
  constructor(value: number) {
    super();
    this.value = value;
  }
}

export class ArrayAst extends Ast {
  value: Ast[];
  constructor(value: Ast[]) {
    super();
    this.value = value;
  }
}

export class ObjectAst extends Ast {
  properties: ObjectPropertyAst[];
  constructor(properties: ObjectPropertyAst[]) {
    super();
    this.properties = properties;
  }
}

export class FunctionCallAst extends Ast {
  name: IdentifierAst;
  params: Ast[];
  constructor(name: IdentifierAst, params: Ast[]) {
    super();
    this.name = name;
    this.params = params;
  }
}

export class ObjectPropertyAst extends Ast {
  name: IdentifierAst;
  value: Ast;
  constructor(name: IdentifierAst, value: Ast) {
    super();
    this.name = name;
    this.value = value;
  }
}