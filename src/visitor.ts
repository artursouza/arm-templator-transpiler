import { Dictionary } from 'lodash';
import { ResourceAst, IdentifierAst, ObjectAst, ObjectPropertyAst, NumberAst, StringAst, ArrayAst } from './ast';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ArmLangVisitor } from './antlr4/ArmLangVisitor';
import { ProgramContext, SectionContext, ResourceContext, ObjectContext, ObjectPropertyContext, PropertyContext, ArrayContext } from './antlr4/ArmLangParser';

export class ArmVisitorContext {
  resources: Dictionary<ResourceAst> = {};
}

export class ArmVisitor extends AbstractParseTreeVisitor<any> implements ArmLangVisitor<any> {
  private context: ArmVisitorContext = new ArmVisitorContext();

  defaultResult(): number {
    return 0
  }

  visitProgram(ctx: ProgramContext) {
    for (const child of ctx.children || []) {
      const resource: ResourceAst = this.visit(child);
      if (this.context.resources[resource.name.name]) {
        throw new Error(`Duplicate identifier '${resource.name.name}`);
      }

      this.context.resources[resource.name.name] = resource;
    }

    console.log(JSON.stringify(this.context, null, 2));
  }
  
  visitSection(ctx: SectionContext) {
    return this.visit(ctx.getChild(0));
  }
  
  visitResource(ctx: ResourceContext) {
    const name = new IdentifierAst(ctx.getChild(1).text);
    const type = new IdentifierAst(ctx.getChild(2).text);
    const object = this.visit(ctx.getChild(3));

    return new ResourceAst(name, type, object);
  }

  visitObject(ctx: ObjectContext) {
    const output = [];

    if (ctx.children) {
      for (let i = 1; i < ctx.children?.length - 1; i++) {
        const property = this.visit(ctx.getChild(i));
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
}