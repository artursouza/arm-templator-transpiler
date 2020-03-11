// Generated from ArmLang.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ProgramContext } from "./ArmLangParser";
import { SectionContext } from "./ArmLangParser";
import { InputDeclContext } from "./ArmLangParser";
import { OutputDeclContext } from "./ArmLangParser";
import { ResourceContext } from "./ArmLangParser";
import { VariableContext } from "./ArmLangParser";
import { ModuleContext } from "./ArmLangParser";
import { ObjectContext } from "./ArmLangParser";
import { ObjectPropertyContext } from "./ArmLangParser";
import { ArrayContext } from "./ArmLangParser";
import { FunctionCallContext } from "./ArmLangParser";
import { IdentifierCallContext } from "./ArmLangParser";
import { PropertyCallContext } from "./ArmLangParser";
import { TypeContext } from "./ArmLangParser";
import { PropertyContext } from "./ArmLangParser";
import { PropertyTailContext } from "./ArmLangParser";


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
	 * Enter a parse tree produced by `ArmLangParser.variable`.
	 * @param ctx the parse tree
	 */
	enterVariable?: (ctx: VariableContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.variable`.
	 * @param ctx the parse tree
	 */
	exitVariable?: (ctx: VariableContext) => void;

	/**
	 * Enter a parse tree produced by `ArmLangParser.module`.
	 * @param ctx the parse tree
	 */
	enterModule?: (ctx: ModuleContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.module`.
	 * @param ctx the parse tree
	 */
	exitModule?: (ctx: ModuleContext) => void;

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
	 * Enter a parse tree produced by `ArmLangParser.identifierCall`.
	 * @param ctx the parse tree
	 */
	enterIdentifierCall?: (ctx: IdentifierCallContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.identifierCall`.
	 * @param ctx the parse tree
	 */
	exitIdentifierCall?: (ctx: IdentifierCallContext) => void;

	/**
	 * Enter a parse tree produced by `ArmLangParser.propertyCall`.
	 * @param ctx the parse tree
	 */
	enterPropertyCall?: (ctx: PropertyCallContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.propertyCall`.
	 * @param ctx the parse tree
	 */
	exitPropertyCall?: (ctx: PropertyCallContext) => void;

	/**
	 * Enter a parse tree produced by `ArmLangParser.type`.
	 * @param ctx the parse tree
	 */
	enterType?: (ctx: TypeContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.type`.
	 * @param ctx the parse tree
	 */
	exitType?: (ctx: TypeContext) => void;

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

	/**
	 * Enter a parse tree produced by `ArmLangParser.propertyTail`.
	 * @param ctx the parse tree
	 */
	enterPropertyTail?: (ctx: PropertyTailContext) => void;
	/**
	 * Exit a parse tree produced by `ArmLangParser.propertyTail`.
	 * @param ctx the parse tree
	 */
	exitPropertyTail?: (ctx: PropertyTailContext) => void;
}

