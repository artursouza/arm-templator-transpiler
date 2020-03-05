import { ResourceAst, IdentifierAst, ObjectAst, ObjectPropertyAst, NumberAst, StringAst, ArrayAst, FunctionCallAst, ProgramAst, Ast, TypeAst, InputDeclAst, OutputDeclAst } from './ast';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ArmLangVisitor } from './antlr4/ArmLangVisitor';
import { ProgramContext, SectionContext, ResourceContext, ObjectContext, ObjectPropertyContext, PropertyContext, ArrayContext, FunctionCallContext, InputDeclContext, OutputDeclContext, TypeContext } from './antlr4/ArmLangParser';

export class ArmVisitor extends AbstractParseTreeVisitor<Ast> implements ArmLangVisitor<Ast> {
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
  const visitor = new ArmVisitor();

  return context.accept(visitor) as ProgramAst;
}