// Generated from ./src/antlr4/ArmLang.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ProgramContext } from "./ArmLangParser";
import { SectionContext } from "./ArmLangParser";
import { InputDeclContext } from "./ArmLangParser";
import { OutputDeclContext } from "./ArmLangParser";
import { ResourceContext } from "./ArmLangParser";
import { ObjectContext } from "./ArmLangParser";
import { ObjectPropertyContext } from "./ArmLangParser";
import { ArrayContext } from "./ArmLangParser";
import { FunctionCallContext } from "./ArmLangParser";
import { PropertyAccessContext } from "./ArmLangParser";
import { TypeContext } from "./ArmLangParser";
import { PropertyContext } from "./ArmLangParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ArmLangParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ArmLangVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `ArmLangParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `ArmLangParser.section`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSection?: (ctx: SectionContext) => Result;

	/**
	 * Visit a parse tree produced by `ArmLangParser.inputDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInputDecl?: (ctx: InputDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ArmLangParser.outputDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutputDecl?: (ctx: OutputDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ArmLangParser.resource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResource?: (ctx: ResourceContext) => Result;

	/**
	 * Visit a parse tree produced by `ArmLangParser.object`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObject?: (ctx: ObjectContext) => Result;

	/**
	 * Visit a parse tree produced by `ArmLangParser.objectProperty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectProperty?: (ctx: ObjectPropertyContext) => Result;

	/**
	 * Visit a parse tree produced by `ArmLangParser.array`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray?: (ctx: ArrayContext) => Result;

	/**
	 * Visit a parse tree produced by `ArmLangParser.functionCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionCall?: (ctx: FunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by `ArmLangParser.propertyAccess`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertyAccess?: (ctx: PropertyAccessContext) => Result;

	/**
	 * Visit a parse tree produced by `ArmLangParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType?: (ctx: TypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ArmLangParser.property`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty?: (ctx: PropertyContext) => Result;
}

