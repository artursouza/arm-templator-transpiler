export abstract class Ast {

}

export class ResourceAst extends Ast {
  name: IdentifierAst;
  type: IdentifierAst;
  properties: ObjectAst;
  constructor(name: IdentifierAst, type: IdentifierAst, properties: ObjectAst) {
    super();
    this.name = name;
    this.type = type;
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
  value: ObjectPropertyAst[];
  constructor(value: ObjectPropertyAst[]) {
    super();
    this.value = value;
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