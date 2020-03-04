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
    const name = new IdentifierAst(ctx.getChild(1).text);
    const type = this.visit(ctx.getChild(2)) as TypeAst;

    return new InputDeclAst(name, type);
  }

  visitOutputDecl(ctx: OutputDeclContext) {
    const name = new IdentifierAst(ctx.getChild(1).text);
    const value = this.visit(ctx.getChild(2));

    return new OutputDeclAst(name, value);
  }
  
  visitResource(ctx: ResourceContext) {
    const provider = new IdentifierAst(ctx.getChild(1).text);
    const type = new StringAst(ctx.getChild(2).text);
    const name = new IdentifierAst(ctx.getChild(3).text);
    const object = this.visit(ctx.getChild(4)) as ObjectAst;

    return new ResourceAst(provider, type, name, object);
  }

  visitType(ctx: TypeContext) {
    return new TypeAst(ctx.text);
  }

  visitObject(ctx: ObjectContext) {
    const output = [];

    if (ctx.children) {
      for (let i = 1; i < ctx.children?.length - 1; i++) {
        const property = this.visit(ctx.getChild(i)) as ObjectPropertyAst;
        output.push(property);
      }
    }

    return new ObjectAst(output);
  }

  visitObjectProperty(ctx: ObjectPropertyContext) {
    const name = new IdentifierAst(ctx.getChild(0).text);
    const prop = this.visit(ctx.getChild(2));
    
    return new ObjectPropertyAst(name, prop);
  }

  visitProperty(ctx: PropertyContext) {
    if (ctx.Number()) {
      return new NumberAst(parseInt(ctx.text));
    }
    if (ctx.String()) {
      return new StringAst(ctx.text);
    }
    if (ctx.Identifier()) {
      return new IdentifierAst(ctx.text);
    }

    return this.visit(ctx.getChild(0));
  }

  visitArray(ctx: ArrayContext) {
    const output = [];

    for (const child of ctx.children || []) {
      const prop = this.visit(child);
      output.push(prop);
    }

    return new ArrayAst(output);
  }

  visitFunctionCall(ctx: FunctionCallContext) {
    const name = new IdentifierAst(ctx.getChild(0).text);

    const params = [];
    if (ctx.children) {
      for (let i = 2; i < ctx.children?.length - 1; i += 2) {
        const property = this.visit(ctx.getChild(i));
        params.push(property);
      }
    }

    return new FunctionCallAst(name, params);
  }
}

export function visit(context: ProgramContext) {
  const visitor = new ArmVisitor();

  return context.accept(visitor) as ProgramAst;
}