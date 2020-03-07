import { ResourceAst, IdentifierAst, ObjectAst, ObjectPropertyAst, NumberAst, StringAst, ArrayAst, FunctionCallAst, ProgramAst, Ast, TypeAst, InputDeclAst, OutputDeclAst } from './ast';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ArmLangVisitor } from './antlr4/ArmLangVisitor';
import { ProgramContext, SectionContext, ResourceContext, ObjectContext, ObjectPropertyContext, PropertyContext, ArrayContext, FunctionCallContext, InputDeclContext, OutputDeclContext, TypeContext } from './antlr4/ArmLangParser';
import { Dictionary } from 'lodash';
import { RuleContext, Token } from 'antlr4ts';

class VisitorContext {
  public errors: Error[] = [];
  public inputs: Dictionary<string> = {};
  public identifiers: Dictionary<RuleContext> = {};
}

abstract class AbstractArmVisitor extends AbstractParseTreeVisitor<void> implements ArmLangVisitor<void> {
  constructor(context: VisitorContext) {
    super();
    this.context = context;
  }

  protected context: VisitorContext;

  defaultResult(): void { }

  protected addError(message: string, token: Token) {
    const error = new Error(`[${token.line}:${token.charPositionInLine}] ${message}`);
    this.context.errors.push(error);
  }
}

class ScopePopulatorVisitor extends AbstractArmVisitor {
  visitResource(ctx: ResourceContext) {
    this.visitChildren(ctx);

    const identifier = ctx.Identifier(1).text;

    if (this.context.identifiers[identifier]) {
      this.addError(`Identifier '${identifier}' has already been declared.`, ctx.Identifier(1).symbol);
    }

    this.context.identifiers[identifier] = ctx;
  }

  visitInputDecl(ctx: InputDeclContext) {
    this.visitChildren(ctx);

    const identifier = ctx.Identifier().text;
    if (this.context.identifiers[identifier]) {
      this.addError(`Identifier '${identifier}' has already been declared.`, ctx.Identifier().symbol);
    }

    this.context.identifiers[identifier] = ctx;
    this.context.inputs[identifier] = ctx.type().text;
  }

  visitType(ctx: TypeContext) {
    this.visitChildren(ctx);

    switch (ctx.text) {
      case 'string':
      case 'securestring':
      case 'int':
      case 'bool':
      case 'object':
      case 'array':
        return;
      default:
        this.addError(`Unrecognized type '${ctx.text}'`, ctx.start);
    }
  }
}

class ScopeCheckVisitor extends AbstractArmVisitor {
  visitProperty(ctx: PropertyContext) {
    this.visitChildren(ctx);

    const identifier = ctx.Identifier();
    if (identifier) {
      if (!this.context.identifiers[identifier.text]) {
        this.addError(`Unrecognized identifier '${identifier}'`, identifier.symbol);
      }
    }
  }
}

class ArmAstVisitor extends AbstractParseTreeVisitor<Ast> implements ArmLangVisitor<Ast> {
  defaultResult(): number {
    return 0
  }

  visitProgram(ctx: ProgramContext) {
    const inputs = [];
    const resources = [];
    const outputs = [];

    for (const child of ctx.children || []) {
      const section = this.visit(child);

      if (section instanceof InputDeclAst) {
        inputs.push(section);
        continue;
      }

      if (section instanceof ResourceAst) {
        resources.push(section);
        continue;
      }

      if (section instanceof OutputDeclAst) {
        outputs.push(section);
        continue;
      }
    }

    return new ProgramAst(inputs, resources, outputs);
  }
  
  visitSection(ctx: SectionContext) {
    return this.visit(ctx.getChild(0));
  }

  visitInputDecl(ctx: InputDeclContext) {
    const name = new IdentifierAst(ctx.Identifier().text);
    const type = this.visitType(ctx.type());

    return new InputDeclAst(name, type);
  }

  visitOutputDecl(ctx: OutputDeclContext) {
    const name = new IdentifierAst(ctx.Identifier().text);
    const value = this.visitProperty(ctx.property());

    return new OutputDeclAst(name, value);
  }
  
  visitResource(ctx: ResourceContext) {
    const provider = new IdentifierAst(ctx.getChild(1).text);
    const type = new StringAst(ctx.String().toString());
    const name = new IdentifierAst(ctx.getChild(3).text);
    const object = this.visit(ctx.getChild(4)) as ObjectAst;

    return new ResourceAst(provider, type, name, object);
  }

  visitType(ctx: TypeContext) {
    return new TypeAst(ctx.text);
  }

  visitObject(ctx: ObjectContext) {
    const properties = ctx.objectProperty().map(prop => this.visitObjectProperty(prop));

    return new ObjectAst(properties);
  }

  visitObjectProperty(ctx: ObjectPropertyContext) {
    const name = new IdentifierAst(ctx.Identifier().text);
    const prop = this.visitProperty(ctx.property());
    
    return new ObjectPropertyAst(name, prop);
  }

  visitProperty(ctx: PropertyContext) {
    const numberText = ctx.Number()?.text;
    if (numberText !== undefined) {
      return new NumberAst(parseInt(numberText));
    }

    const stringText = ctx.String()?.text;
    if (stringText !== undefined) {
      return new StringAst(stringText);
    }

    const identifierText = ctx.Identifier()?.text;
    if (identifierText !== undefined) {
      return new IdentifierAst(identifierText);
    }

    return this.visit(ctx.getChild(0));
  }

  visitArray(ctx: ArrayContext) {
    const output = [];

    for (const prop of ctx.property() || []) {
      output.push(this.visit(prop));
    }

    return new ArrayAst(output);
  }

  visitFunctionCall(ctx: FunctionCallContext) {
    const name = new IdentifierAst(ctx.Identifier().text);
    const params = ctx.property().map(prop => this.visitProperty(prop));

    return new FunctionCallAst(name, params);
  }
}

export function visit(context: ProgramContext) {
  const visitorContext = new VisitorContext();
  const visitors: AbstractArmVisitor[] = [
    new ScopePopulatorVisitor(visitorContext),
    new ScopeCheckVisitor(visitorContext),
  ];

  for (const visitor of visitors) {
    context.accept(visitor);
    if (visitorContext.errors.length > 0) {
      for (const error of visitorContext.errors) {
        console.error(error.message);
      }

      throw new Error(`Parsing failed: \n${visitorContext.errors.map(e => e.message).join('\n')}`);
    }
  }

  const visitor = new ArmAstVisitor();
  return context.accept(visitor) as ProgramAst;
}