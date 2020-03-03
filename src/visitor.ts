import { Dictionary } from 'lodash';
import { ResourceAst, IdentifierAst, ObjectAst, ObjectPropertyAst, NumberAst, StringAst, ArrayAst, FunctionCallAst, ProgramAst, Ast } from './ast';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ArmLangVisitor } from './antlr4/ArmLangVisitor';
import { ProgramContext, SectionContext, ResourceContext, ObjectContext, ObjectPropertyContext, PropertyContext, ArrayContext, FunctionCallContext } from './antlr4/ArmLangParser';

export class ArmVisitorContext {
  resources: Dictionary<ResourceAst> = {};
}

export class ArmVisitor extends AbstractParseTreeVisitor<Ast> implements ArmLangVisitor<Ast> {
  private context: ArmVisitorContext = new ArmVisitorContext();

  defaultResult(): number {
    return 0
  }

  visitProgram(ctx: ProgramContext) {
    const resources = [];

    for (const child of ctx.children || []) {
      const resource = this.visit(child) as ResourceAst;
      if (this.context.resources[resource.name.name]) {
        throw new Error(`Duplicate identifier '${resource.name.name}`);
      }

      resources.push(resource);
    }

    return new ProgramAst(resources);
  }
  
  visitSection(ctx: SectionContext) {
    return this.visit(ctx.getChild(0));
  }
  
  visitResource(ctx: ResourceContext) {
    const name = new IdentifierAst(ctx.getChild(1).text);
    const type = new IdentifierAst(ctx.getChild(2).text);
    const object = this.visit(ctx.getChild(3)) as ObjectAst;

    return new ResourceAst(name, type, object);
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