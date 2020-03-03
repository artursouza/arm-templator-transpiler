// Generated from ./src/antlr4/ArmLang.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ProgramContext } from "./ArmLangParser";
import { SectionContext } from "./ArmLangParser";
import { InputDeclContext } from "./ArmLangParser";
import { OutputDeclContext } from "./ArmLangParser";
import { ResourceContext } from "./ArmLangParser";
import { ObjectContext } from "./ArmLangParser";
import { ObjectPropertyContext } from "./ArmLangParser";
import { ArrayContext } from "./ArmLangParser";
import { FunctionCallContext } from "./ArmLangParser";
import { PropertyContext } from "./ArmLangParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ArmLangParser`.
 */
export interface ArmLangListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ArmLangParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `ArmLangParser.section`.
	 * @param ctx the parse tree
	 */
	enterSection?: (ctx: SectionContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.section`.
	 * @param ctx the parse tree
	 */
	exitSection?: (ctx: SectionContext) => void;

	/**
	 * Enter a parse tree produced by `ArmLangParser.inputDecl`.
	 * @param ctx the parse tree
	 */
	enterInputDecl?: (ctx: InputDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.inputDecl`.
	 * @param ctx the parse tree
	 */
	exitInputDecl?: (ctx: InputDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ArmLangParser.outputDecl`.
	 * @param ctx the parse tree
	 */
	enterOutputDecl?: (ctx: OutputDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.outputDecl`.
	 * @param ctx the parse tree
	 */
	exitOutputDecl?: (ctx: OutputDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ArmLangParser.resource`.
	 * @param ctx the parse tree
	 */
	enterResource?: (ctx: ResourceContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.resource`.
	 * @param ctx the parse tree
	 */
	exitResource?: (ctx: ResourceContext) => void;

	/**
	 * Enter a parse tree produced by `ArmLangParser.object`.
	 * @param ctx the parse tree
	 */
	enterObject?: (ctx: ObjectContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.object`.
	 * @param ctx the parse tree
	 */
	exitObject?: (ctx: ObjectContext) => void;

	/**
	 * Enter a parse tree produced by `ArmLangParser.objectProperty`.
	 * @param ctx the parse tree
	 */
	enterObjectProperty?: (ctx: ObjectPropertyContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.objectProperty`.
	 * @param ctx the parse tree
	 */
	exitObjectProperty?: (ctx: ObjectPropertyContext) => void;

	/**
	 * Enter a parse tree produced by `ArmLangParser.array`.
	 * @param ctx the parse tree
	 */
	enterArray?: (ctx: ArrayContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.array`.
	 * @param ctx the parse tree
	 */
	exitArray?: (ctx: ArrayContext) => void;

	/**
	 * Enter a parse tree produced by `ArmLangParser.functionCall`.
	 * @param ctx the parse tree
	 */
	enterFunctionCall?: (ctx: FunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.functionCall`.
	 * @param ctx the parse tree
	 */
	exitFunctionCall?: (ctx: FunctionCallContext) => void;

	/**
	 * Enter a parse tree produced by `ArmLangParser.property`.
	 * @param ctx the parse tree
	 */
	enterProperty?: (ctx: PropertyContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.property`.
	 * @param ctx the parse tree
	 */
	exitProperty?: (ctx: PropertyContext) => void;
}

