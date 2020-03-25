// Generated from ArmLang.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ArmLangListener } from "./ArmLangListener";
import { ArmLangVisitor } from "./ArmLangVisitor";


export class ArmLangParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly Bool = 22;
	public static readonly Number = 23;
	public static readonly String = 24;
	public static readonly Identifier = 25;
	public static readonly BlockComment = 26;
	public static readonly LineComment = 27;
	public static readonly Whitespace = 28;
	public static readonly RULE_program = 0;
	public static readonly RULE_section = 1;
	public static readonly RULE_inputDecl = 2;
	public static readonly RULE_outputDecl = 3;
	public static readonly RULE_resource = 4;
	public static readonly RULE_variable = 5;
	public static readonly RULE_module = 6;
	public static readonly RULE_object = 7;
	public static readonly RULE_objectProperty = 8;
	public static readonly RULE_array = 9;
	public static readonly RULE_functionCall = 10;
	public static readonly RULE_identifierCall = 11;
	public static readonly RULE_propertyCall = 12;
	public static readonly RULE_type = 13;
	public static readonly RULE_property = 14;
	public static readonly RULE_propertyTail = 15;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "section", "inputDecl", "outputDecl", "resource", "variable", 
		"module", "object", "objectProperty", "array", "functionCall", "identifierCall", 
		"propertyCall", "type", "property", "propertyTail",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'input'", "'output'", "':'", "'resource'", "'variable'", "'export'", 
		"'module'", "'{'", "'}'", "'['", "']'", "'('", "')'", "','", "'string'", 
		"'securestring'", "'int'", "'bool'", "'object'", "'array'", "'.'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "Bool", "Number", "String", "Identifier", "BlockComment", "LineComment", 
		"Whitespace",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ArmLangParser._LITERAL_NAMES, ArmLangParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ArmLangParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "ArmLang.g4"; }

	// @Override
	public get ruleNames(): string[] { return ArmLangParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ArmLangParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ArmLangParser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ArmLangParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 36;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ArmLangParser.T__0) | (1 << ArmLangParser.T__1) | (1 << ArmLangParser.T__3) | (1 << ArmLangParser.T__4) | (1 << ArmLangParser.T__5) | (1 << ArmLangParser.T__6))) !== 0)) {
				{
				this.state = 34;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ArmLangParser.T__0:
				case ArmLangParser.T__1:
				case ArmLangParser.T__3:
				case ArmLangParser.T__4:
					{
					this.state = 32;
					this.section();
					}
					break;
				case ArmLangParser.T__5:
				case ArmLangParser.T__6:
					{
					this.state = 33;
					this.module();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 38;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public section(): SectionContext {
		let _localctx: SectionContext = new SectionContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ArmLangParser.RULE_section);
		try {
			this.state = 43;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ArmLangParser.T__3:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 39;
				this.resource();
				}
				break;
			case ArmLangParser.T__4:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 40;
				this.variable();
				}
				break;
			case ArmLangParser.T__0:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 41;
				this.inputDecl();
				}
				break;
			case ArmLangParser.T__1:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 42;
				this.outputDecl();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public inputDecl(): InputDeclContext {
		let _localctx: InputDeclContext = new InputDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ArmLangParser.RULE_inputDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 45;
			this.match(ArmLangParser.T__0);
			this.state = 46;
			this.type();
			this.state = 47;
			this.match(ArmLangParser.Identifier);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public outputDecl(): OutputDeclContext {
		let _localctx: OutputDeclContext = new OutputDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ArmLangParser.RULE_outputDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 49;
			this.match(ArmLangParser.T__1);
			this.state = 50;
			this.match(ArmLangParser.Identifier);
			this.state = 51;
			this.match(ArmLangParser.T__2);
			this.state = 52;
			this.property();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resource(): ResourceContext {
		let _localctx: ResourceContext = new ResourceContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, ArmLangParser.RULE_resource);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 54;
			this.match(ArmLangParser.T__3);
			this.state = 55;
			this.match(ArmLangParser.Identifier);
			this.state = 56;
			this.match(ArmLangParser.String);
			this.state = 57;
			this.match(ArmLangParser.Identifier);
			this.state = 58;
			this.object();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variable(): VariableContext {
		let _localctx: VariableContext = new VariableContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ArmLangParser.RULE_variable);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 60;
			this.match(ArmLangParser.T__4);
			this.state = 61;
			this.match(ArmLangParser.Identifier);
			this.state = 62;
			this.property();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public module(): ModuleContext {
		let _localctx: ModuleContext = new ModuleContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ArmLangParser.RULE_module);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 66;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ArmLangParser.T__5:
				{
				this.state = 64;
				this.match(ArmLangParser.T__5);
				}
				break;
			case ArmLangParser.T__6:
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 68;
			this.match(ArmLangParser.T__6);
			this.state = 69;
			this.match(ArmLangParser.Identifier);
			this.state = 70;
			this.match(ArmLangParser.T__7);
			this.state = 74;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ArmLangParser.T__0) | (1 << ArmLangParser.T__1) | (1 << ArmLangParser.T__3) | (1 << ArmLangParser.T__4))) !== 0)) {
				{
				{
				this.state = 71;
				this.section();
				}
				}
				this.state = 76;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 77;
			this.match(ArmLangParser.T__8);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public object(): ObjectContext {
		let _localctx: ObjectContext = new ObjectContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ArmLangParser.RULE_object);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 79;
			this.match(ArmLangParser.T__7);
			this.state = 83;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ArmLangParser.Identifier) {
				{
				{
				this.state = 80;
				this.objectProperty();
				}
				}
				this.state = 85;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 86;
			this.match(ArmLangParser.T__8);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public objectProperty(): ObjectPropertyContext {
		let _localctx: ObjectPropertyContext = new ObjectPropertyContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, ArmLangParser.RULE_objectProperty);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 88;
			this.match(ArmLangParser.Identifier);
			this.state = 89;
			this.match(ArmLangParser.T__2);
			this.state = 90;
			this.property();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public array(): ArrayContext {
		let _localctx: ArrayContext = new ArrayContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, ArmLangParser.RULE_array);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 92;
			this.match(ArmLangParser.T__9);
			this.state = 96;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ArmLangParser.T__7) | (1 << ArmLangParser.T__9) | (1 << ArmLangParser.Bool) | (1 << ArmLangParser.Number) | (1 << ArmLangParser.String) | (1 << ArmLangParser.Identifier))) !== 0)) {
				{
				{
				this.state = 93;
				this.property();
				}
				}
				this.state = 98;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 99;
			this.match(ArmLangParser.T__10);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionCall(): FunctionCallContext {
		let _localctx: FunctionCallContext = new FunctionCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, ArmLangParser.RULE_functionCall);
		let _la: number;
		try {
			this.state = 116;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 101;
				this.match(ArmLangParser.Identifier);
				this.state = 102;
				this.match(ArmLangParser.T__11);
				this.state = 103;
				this.match(ArmLangParser.T__12);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 104;
				this.match(ArmLangParser.Identifier);
				this.state = 105;
				this.match(ArmLangParser.T__11);
				this.state = 106;
				this.property();
				this.state = 111;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ArmLangParser.T__13) {
					{
					{
					this.state = 107;
					this.match(ArmLangParser.T__13);
					this.state = 108;
					this.property();
					}
					}
					this.state = 113;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 114;
				this.match(ArmLangParser.T__12);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifierCall(): IdentifierCallContext {
		let _localctx: IdentifierCallContext = new IdentifierCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, ArmLangParser.RULE_identifierCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 118;
			this.match(ArmLangParser.Identifier);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public propertyCall(): PropertyCallContext {
		let _localctx: PropertyCallContext = new PropertyCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, ArmLangParser.RULE_propertyCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 120;
			this.match(ArmLangParser.Identifier);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type(): TypeContext {
		let _localctx: TypeContext = new TypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, ArmLangParser.RULE_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 122;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ArmLangParser.T__14) | (1 << ArmLangParser.T__15) | (1 << ArmLangParser.T__16) | (1 << ArmLangParser.T__17) | (1 << ArmLangParser.T__18) | (1 << ArmLangParser.T__19))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public property(): PropertyContext {
		let _localctx: PropertyContext = new PropertyContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, ArmLangParser.RULE_property);
		try {
			this.state = 135;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 124;
				this.match(ArmLangParser.String);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 125;
				this.match(ArmLangParser.Number);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 126;
				this.match(ArmLangParser.Bool);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 127;
				this.object();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 128;
				this.array();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 129;
				this.identifierCall();
				this.state = 130;
				this.propertyTail();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 132;
				this.functionCall();
				this.state = 133;
				this.propertyTail();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public propertyTail(): PropertyTailContext {
		let _localctx: PropertyTailContext = new PropertyTailContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, ArmLangParser.RULE_propertyTail);
		try {
			this.state = 142;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ArmLangParser.T__20:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 137;
				this.match(ArmLangParser.T__20);
				this.state = 138;
				this.propertyCall();
				this.state = 139;
				this.propertyTail();
				}
				break;
			case ArmLangParser.EOF:
			case ArmLangParser.T__0:
			case ArmLangParser.T__1:
			case ArmLangParser.T__3:
			case ArmLangParser.T__4:
			case ArmLangParser.T__5:
			case ArmLangParser.T__6:
			case ArmLangParser.T__7:
			case ArmLangParser.T__8:
			case ArmLangParser.T__9:
			case ArmLangParser.T__10:
			case ArmLangParser.T__12:
			case ArmLangParser.T__13:
			case ArmLangParser.Bool:
			case ArmLangParser.Number:
			case ArmLangParser.String:
			case ArmLangParser.Identifier:
				this.enterOuterAlt(_localctx, 2);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1E\x93\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x03\x02\x03\x02\x07" +
		"\x02%\n\x02\f\x02\x0E\x02(\v\x02\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03" +
		".\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05" +
		"\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07" +
		"\x03\x07\x03\x07\x03\b\x03\b\x05\bE\n\b\x03\b\x03\b\x03\b\x03\b\x07\b" +
		"K\n\b\f\b\x0E\bN\v\b\x03\b\x03\b\x03\t\x03\t\x07\tT\n\t\f\t\x0E\tW\v\t" +
		"\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\v\x03\v\x07\va\n\v\f\v\x0E\v" +
		"d\v\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x07" +
		"\fp\n\f\f\f\x0E\fs\v\f\x03\f\x03\f\x05\fw\n\f\x03\r\x03\r\x03\x0E\x03" +
		"\x0E\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03" +
		"\x10\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\x8A\n\x10\x03\x11\x03\x11" +
		"\x03\x11\x03\x11\x03\x11\x05\x11\x91\n\x11\x03\x11\x02\x02\x02\x12\x02" +
		"\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02" +
		"\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\x02\x03\x03\x02\x11\x16" +
		"\x02\x94\x02&\x03\x02\x02\x02\x04-\x03\x02\x02\x02\x06/\x03\x02\x02\x02" +
		"\b3\x03\x02\x02\x02\n8\x03\x02\x02\x02\f>\x03\x02\x02\x02\x0ED\x03\x02" +
		"\x02\x02\x10Q\x03\x02\x02\x02\x12Z\x03\x02\x02\x02\x14^\x03\x02\x02\x02" +
		"\x16v\x03\x02\x02\x02\x18x\x03\x02\x02\x02\x1Az\x03\x02\x02\x02\x1C|\x03" +
		"\x02\x02\x02\x1E\x89\x03\x02\x02\x02 \x90\x03\x02\x02\x02\"%\x05\x04\x03" +
		"\x02#%\x05\x0E\b\x02$\"\x03\x02\x02\x02$#\x03\x02\x02\x02%(\x03\x02\x02" +
		"\x02&$\x03\x02\x02\x02&\'\x03\x02\x02\x02\'\x03\x03\x02\x02\x02(&\x03" +
		"\x02\x02\x02).\x05\n\x06\x02*.\x05\f\x07\x02+.\x05\x06\x04\x02,.\x05\b" +
		"\x05\x02-)\x03\x02\x02\x02-*\x03\x02\x02\x02-+\x03\x02\x02\x02-,\x03\x02" +
		"\x02\x02.\x05\x03\x02\x02\x02/0\x07\x03\x02\x0201\x05\x1C\x0F\x0212\x07" +
		"\x1B\x02\x022\x07\x03\x02\x02\x0234\x07\x04\x02\x0245\x07\x1B\x02\x02" +
		"56\x07\x05\x02\x0267\x05\x1E\x10\x027\t\x03\x02\x02\x0289\x07\x06\x02" +
		"\x029:\x07\x1B\x02\x02:;\x07\x1A\x02\x02;<\x07\x1B\x02\x02<=\x05\x10\t" +
		"\x02=\v\x03\x02\x02\x02>?\x07\x07\x02\x02?@\x07\x1B\x02\x02@A\x05\x1E" +
		"\x10\x02A\r\x03\x02\x02\x02BE\x07\b\x02\x02CE\x03\x02\x02\x02DB\x03\x02" +
		"\x02\x02DC\x03\x02\x02\x02EF\x03\x02\x02\x02FG\x07\t\x02\x02GH\x07\x1B" +
		"\x02\x02HL\x07\n\x02\x02IK\x05\x04\x03\x02JI\x03\x02\x02\x02KN\x03\x02" +
		"\x02\x02LJ\x03\x02\x02\x02LM\x03\x02\x02\x02MO\x03\x02\x02\x02NL\x03\x02" +
		"\x02\x02OP\x07\v\x02\x02P\x0F\x03\x02\x02\x02QU\x07\n\x02\x02RT\x05\x12" +
		"\n\x02SR\x03\x02\x02\x02TW\x03\x02\x02\x02US\x03\x02\x02\x02UV\x03\x02" +
		"\x02\x02VX\x03\x02\x02\x02WU\x03\x02\x02\x02XY\x07\v\x02\x02Y\x11\x03" +
		"\x02\x02\x02Z[\x07\x1B\x02\x02[\\\x07\x05\x02\x02\\]\x05\x1E\x10\x02]" +
		"\x13\x03\x02\x02\x02^b\x07\f\x02\x02_a\x05\x1E\x10\x02`_\x03\x02\x02\x02" +
		"ad\x03\x02\x02\x02b`\x03\x02\x02\x02bc\x03\x02\x02\x02ce\x03\x02\x02\x02" +
		"db\x03\x02\x02\x02ef\x07\r\x02\x02f\x15\x03\x02\x02\x02gh\x07\x1B\x02" +
		"\x02hi\x07\x0E\x02\x02iw\x07\x0F\x02\x02jk\x07\x1B\x02\x02kl\x07\x0E\x02" +
		"\x02lq\x05\x1E\x10\x02mn\x07\x10\x02\x02np\x05\x1E\x10\x02om\x03\x02\x02" +
		"\x02ps\x03\x02\x02\x02qo\x03\x02\x02\x02qr\x03\x02\x02\x02rt\x03\x02\x02" +
		"\x02sq\x03\x02\x02\x02tu\x07\x0F\x02\x02uw\x03\x02\x02\x02vg\x03\x02\x02" +
		"\x02vj\x03\x02\x02\x02w\x17\x03\x02\x02\x02xy\x07\x1B\x02\x02y\x19\x03" +
		"\x02\x02\x02z{\x07\x1B\x02\x02{\x1B\x03\x02\x02\x02|}\t\x02\x02\x02}\x1D" +
		"\x03\x02\x02\x02~\x8A\x07\x1A\x02\x02\x7F\x8A\x07\x19\x02\x02\x80\x8A" +
		"\x07\x18\x02\x02\x81\x8A\x05\x10\t\x02\x82\x8A\x05\x14\v\x02\x83\x84\x05" +
		"\x18\r\x02\x84\x85\x05 \x11\x02\x85\x8A\x03\x02\x02\x02\x86\x87\x05\x16" +
		"\f\x02\x87\x88\x05 \x11\x02\x88\x8A\x03\x02\x02\x02\x89~\x03\x02\x02\x02" +
		"\x89\x7F\x03\x02\x02\x02\x89\x80\x03\x02\x02\x02\x89\x81\x03\x02\x02\x02" +
		"\x89\x82\x03\x02\x02\x02\x89\x83\x03\x02\x02\x02\x89\x86\x03\x02\x02\x02" +
		"\x8A\x1F\x03\x02\x02\x02\x8B\x8C\x07\x17\x02\x02\x8C\x8D\x05\x1A\x0E\x02" +
		"\x8D\x8E\x05 \x11\x02\x8E\x91\x03\x02\x02\x02\x8F\x91\x03\x02\x02\x02" +
		"\x90\x8B\x03\x02\x02\x02\x90\x8F\x03\x02\x02\x02\x91!\x03\x02\x02\x02" +
		"\r$&-DLUbqv\x89\x90";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ArmLangParser.__ATN) {
			ArmLangParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ArmLangParser._serializedATN));
		}

		return ArmLangParser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public section(): SectionContext[];
	public section(i: number): SectionContext;
	public section(i?: number): SectionContext | SectionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SectionContext);
		} else {
			return this.getRuleContext(i, SectionContext);
		}
	}
	public module(): ModuleContext[];
	public module(i: number): ModuleContext;
	public module(i?: number): ModuleContext | ModuleContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ModuleContext);
		} else {
			return this.getRuleContext(i, ModuleContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_program; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SectionContext extends ParserRuleContext {
	public resource(): ResourceContext | undefined {
		return this.tryGetRuleContext(0, ResourceContext);
	}
	public variable(): VariableContext | undefined {
		return this.tryGetRuleContext(0, VariableContext);
	}
	public inputDecl(): InputDeclContext | undefined {
		return this.tryGetRuleContext(0, InputDeclContext);
	}
	public outputDecl(): OutputDeclContext | undefined {
		return this.tryGetRuleContext(0, OutputDeclContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_section; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterSection) {
			listener.enterSection(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitSection) {
			listener.exitSection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitSection) {
			return visitor.visitSection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InputDeclContext extends ParserRuleContext {
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public Identifier(): TerminalNode { return this.getToken(ArmLangParser.Identifier, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_inputDecl; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterInputDecl) {
			listener.enterInputDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitInputDecl) {
			listener.exitInputDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitInputDecl) {
			return visitor.visitInputDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OutputDeclContext extends ParserRuleContext {
	public Identifier(): TerminalNode { return this.getToken(ArmLangParser.Identifier, 0); }
	public property(): PropertyContext {
		return this.getRuleContext(0, PropertyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_outputDecl; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterOutputDecl) {
			listener.enterOutputDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitOutputDecl) {
			listener.exitOutputDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitOutputDecl) {
			return visitor.visitOutputDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResourceContext extends ParserRuleContext {
	public Identifier(): TerminalNode[];
	public Identifier(i: number): TerminalNode;
	public Identifier(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ArmLangParser.Identifier);
		} else {
			return this.getToken(ArmLangParser.Identifier, i);
		}
	}
	public String(): TerminalNode { return this.getToken(ArmLangParser.String, 0); }
	public object(): ObjectContext {
		return this.getRuleContext(0, ObjectContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_resource; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterResource) {
			listener.enterResource(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitResource) {
			listener.exitResource(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitResource) {
			return visitor.visitResource(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableContext extends ParserRuleContext {
	public Identifier(): TerminalNode { return this.getToken(ArmLangParser.Identifier, 0); }
	public property(): PropertyContext {
		return this.getRuleContext(0, PropertyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_variable; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterVariable) {
			listener.enterVariable(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitVariable) {
			listener.exitVariable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitVariable) {
			return visitor.visitVariable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModuleContext extends ParserRuleContext {
	public Identifier(): TerminalNode { return this.getToken(ArmLangParser.Identifier, 0); }
	public section(): SectionContext[];
	public section(i: number): SectionContext;
	public section(i?: number): SectionContext | SectionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SectionContext);
		} else {
			return this.getRuleContext(i, SectionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_module; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterModule) {
			listener.enterModule(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitModule) {
			listener.exitModule(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitModule) {
			return visitor.visitModule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjectContext extends ParserRuleContext {
	public objectProperty(): ObjectPropertyContext[];
	public objectProperty(i: number): ObjectPropertyContext;
	public objectProperty(i?: number): ObjectPropertyContext | ObjectPropertyContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ObjectPropertyContext);
		} else {
			return this.getRuleContext(i, ObjectPropertyContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_object; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterObject) {
			listener.enterObject(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitObject) {
			listener.exitObject(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitObject) {
			return visitor.visitObject(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjectPropertyContext extends ParserRuleContext {
	public Identifier(): TerminalNode { return this.getToken(ArmLangParser.Identifier, 0); }
	public property(): PropertyContext {
		return this.getRuleContext(0, PropertyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_objectProperty; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterObjectProperty) {
			listener.enterObjectProperty(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitObjectProperty) {
			listener.exitObjectProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitObjectProperty) {
			return visitor.visitObjectProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayContext extends ParserRuleContext {
	public property(): PropertyContext[];
	public property(i: number): PropertyContext;
	public property(i?: number): PropertyContext | PropertyContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PropertyContext);
		} else {
			return this.getRuleContext(i, PropertyContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_array; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterArray) {
			listener.enterArray(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitArray) {
			listener.exitArray(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitArray) {
			return visitor.visitArray(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionCallContext extends ParserRuleContext {
	public Identifier(): TerminalNode { return this.getToken(ArmLangParser.Identifier, 0); }
	public property(): PropertyContext[];
	public property(i: number): PropertyContext;
	public property(i?: number): PropertyContext | PropertyContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PropertyContext);
		} else {
			return this.getRuleContext(i, PropertyContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_functionCall; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterFunctionCall) {
			listener.enterFunctionCall(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitFunctionCall) {
			listener.exitFunctionCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitFunctionCall) {
			return visitor.visitFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierCallContext extends ParserRuleContext {
	public Identifier(): TerminalNode { return this.getToken(ArmLangParser.Identifier, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_identifierCall; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterIdentifierCall) {
			listener.enterIdentifierCall(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitIdentifierCall) {
			listener.exitIdentifierCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitIdentifierCall) {
			return visitor.visitIdentifierCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertyCallContext extends ParserRuleContext {
	public Identifier(): TerminalNode { return this.getToken(ArmLangParser.Identifier, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_propertyCall; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterPropertyCall) {
			listener.enterPropertyCall(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitPropertyCall) {
			listener.exitPropertyCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitPropertyCall) {
			return visitor.visitPropertyCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_type; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterType) {
			listener.enterType(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitType) {
			listener.exitType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitType) {
			return visitor.visitType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertyContext extends ParserRuleContext {
	public String(): TerminalNode | undefined { return this.tryGetToken(ArmLangParser.String, 0); }
	public Number(): TerminalNode | undefined { return this.tryGetToken(ArmLangParser.Number, 0); }
	public Bool(): TerminalNode | undefined { return this.tryGetToken(ArmLangParser.Bool, 0); }
	public object(): ObjectContext | undefined {
		return this.tryGetRuleContext(0, ObjectContext);
	}
	public array(): ArrayContext | undefined {
		return this.tryGetRuleContext(0, ArrayContext);
	}
	public identifierCall(): IdentifierCallContext | undefined {
		return this.tryGetRuleContext(0, IdentifierCallContext);
	}
	public propertyTail(): PropertyTailContext | undefined {
		return this.tryGetRuleContext(0, PropertyTailContext);
	}
	public functionCall(): FunctionCallContext | undefined {
		return this.tryGetRuleContext(0, FunctionCallContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_property; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterProperty) {
			listener.enterProperty(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitProperty) {
			listener.exitProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitProperty) {
			return visitor.visitProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertyTailContext extends ParserRuleContext {
	public propertyCall(): PropertyCallContext | undefined {
		return this.tryGetRuleContext(0, PropertyCallContext);
	}
	public propertyTail(): PropertyTailContext | undefined {
		return this.tryGetRuleContext(0, PropertyTailContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_propertyTail; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterPropertyTail) {
			listener.enterPropertyTail(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitPropertyTail) {
			listener.exitPropertyTail(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitPropertyTail) {
			return visitor.visitPropertyTail(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


