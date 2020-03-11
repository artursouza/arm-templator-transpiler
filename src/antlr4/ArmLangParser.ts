// Generated from ./src/antlr4/ArmLang.g4 by ANTLR 4.7.3-SNAPSHOT


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
	public static readonly Identifier = 21;
	public static readonly Number = 22;
	public static readonly String = 23;
	public static readonly BlockComment = 24;
	public static readonly LineComment = 25;
	public static readonly Whitespace = 26;
	public static readonly RULE_program = 0;
	public static readonly RULE_section = 1;
	public static readonly RULE_inputDecl = 2;
	public static readonly RULE_outputDecl = 3;
	public static readonly RULE_resource = 4;
	public static readonly RULE_object = 5;
	public static readonly RULE_objectProperty = 6;
	public static readonly RULE_array = 7;
	public static readonly RULE_functionCall = 8;
	public static readonly RULE_identifierCall = 9;
	public static readonly RULE_type = 10;
	public static readonly RULE_property = 11;
	public static readonly RULE_propertyTail = 12;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "section", "inputDecl", "outputDecl", "resource", "object", 
		"objectProperty", "array", "functionCall", "identifierCall", "type", "property", 
		"propertyTail",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'input'", "'output'", "'resource'", "'{'", "'}'", "':'", "'['", 
		"']'", "'('", "')'", "','", "'string'", "'securestring'", "'int'", "'bool'", 
		"'object'", "'array'", "'true'", "'false'", "'.'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"Identifier", "Number", "String", "BlockComment", "LineComment", "Whitespace",
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
			this.state = 29;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ArmLangParser.T__0) | (1 << ArmLangParser.T__1) | (1 << ArmLangParser.T__2))) !== 0)) {
				{
				{
				this.state = 26;
				this.section();
				}
				}
				this.state = 31;
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
			this.state = 35;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ArmLangParser.T__2:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 32;
				this.resource();
				}
				break;
			case ArmLangParser.T__0:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 33;
				this.inputDecl();
				}
				break;
			case ArmLangParser.T__1:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 34;
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
			this.state = 37;
			this.match(ArmLangParser.T__0);
			this.state = 38;
			this.match(ArmLangParser.Identifier);
			this.state = 39;
			this.type();
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
			this.state = 41;
			this.match(ArmLangParser.T__1);
			this.state = 42;
			this.match(ArmLangParser.Identifier);
			this.state = 43;
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
			this.state = 45;
			this.match(ArmLangParser.T__2);
			this.state = 46;
			this.match(ArmLangParser.Identifier);
			this.state = 47;
			this.match(ArmLangParser.String);
			this.state = 48;
			this.match(ArmLangParser.Identifier);
			this.state = 49;
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
	public object(): ObjectContext {
		let _localctx: ObjectContext = new ObjectContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ArmLangParser.RULE_object);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 51;
			this.match(ArmLangParser.T__3);
			this.state = 55;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ArmLangParser.Identifier) {
				{
				{
				this.state = 52;
				this.objectProperty();
				}
				}
				this.state = 57;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 58;
			this.match(ArmLangParser.T__4);
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
		this.enterRule(_localctx, 12, ArmLangParser.RULE_objectProperty);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 60;
			this.match(ArmLangParser.Identifier);
			this.state = 61;
			this.match(ArmLangParser.T__5);
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
	public array(): ArrayContext {
		let _localctx: ArrayContext = new ArrayContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ArmLangParser.RULE_array);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 64;
			this.match(ArmLangParser.T__6);
			this.state = 68;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ArmLangParser.T__3) | (1 << ArmLangParser.T__6) | (1 << ArmLangParser.T__17) | (1 << ArmLangParser.T__18) | (1 << ArmLangParser.Identifier) | (1 << ArmLangParser.Number) | (1 << ArmLangParser.String))) !== 0)) {
				{
				{
				this.state = 65;
				this.property();
				}
				}
				this.state = 70;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 71;
			this.match(ArmLangParser.T__7);
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
		this.enterRule(_localctx, 16, ArmLangParser.RULE_functionCall);
		let _la: number;
		try {
			this.state = 88;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 73;
				this.match(ArmLangParser.Identifier);
				this.state = 74;
				this.match(ArmLangParser.T__8);
				this.state = 75;
				this.match(ArmLangParser.T__9);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 76;
				this.match(ArmLangParser.Identifier);
				this.state = 77;
				this.match(ArmLangParser.T__8);
				this.state = 78;
				this.property();
				this.state = 83;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ArmLangParser.T__10) {
					{
					{
					this.state = 79;
					this.match(ArmLangParser.T__10);
					this.state = 80;
					this.property();
					}
					}
					this.state = 85;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 86;
				this.match(ArmLangParser.T__9);
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
		this.enterRule(_localctx, 18, ArmLangParser.RULE_identifierCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 90;
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
		this.enterRule(_localctx, 20, ArmLangParser.RULE_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 92;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ArmLangParser.T__11) | (1 << ArmLangParser.T__12) | (1 << ArmLangParser.T__13) | (1 << ArmLangParser.T__14) | (1 << ArmLangParser.T__15) | (1 << ArmLangParser.T__16))) !== 0))) {
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
		this.enterRule(_localctx, 22, ArmLangParser.RULE_property);
		try {
			this.state = 106;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 94;
				this.match(ArmLangParser.String);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 95;
				this.match(ArmLangParser.Number);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 96;
				this.match(ArmLangParser.T__17);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 97;
				this.match(ArmLangParser.T__18);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 98;
				this.object();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 99;
				this.array();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 100;
				this.identifierCall();
				this.state = 101;
				this.propertyTail();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 103;
				this.functionCall();
				this.state = 104;
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
		this.enterRule(_localctx, 24, ArmLangParser.RULE_propertyTail);
		try {
			this.state = 117;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 108;
				this.match(ArmLangParser.T__19);
				this.state = 109;
				this.identifierCall();
				this.state = 110;
				this.propertyTail();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 112;
				this.match(ArmLangParser.T__19);
				this.state = 113;
				this.functionCall();
				this.state = 114;
				this.propertyTail();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				// tslint:disable-next-line:no-empty
				{
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

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1Cz\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x03\x02\x07\x02\x1E\n\x02\f\x02\x0E\x02!\v\x02\x03\x03\x03" +
		"\x03\x03\x03\x05\x03&\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x07\x03\x07\x07\x078\n\x07\f\x07\x0E\x07;\v\x07\x03\x07\x03\x07\x03\b" +
		"\x03\b\x03\b\x03\b\x03\t\x03\t\x07\tE\n\t\f\t\x0E\tH\v\t\x03\t\x03\t\x03" +
		"\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x07\nT\n\n\f\n\x0E\nW\v\n" +
		"\x03\n\x03\n\x05\n[\n\n\x03\v\x03\v\x03\f\x03\f\x03\r\x03\r\x03\r\x03" +
		"\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x05\rm\n\r\x03\x0E" +
		"\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E" +
		"x\n\x0E\x03\x0E\x02\x02\x02\x0F\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f" +
		"\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x02\x03\x03" +
		"\x02\x0E\x13\x02|\x02\x1F\x03\x02\x02\x02\x04%\x03\x02\x02\x02\x06\'\x03" +
		"\x02\x02\x02\b+\x03\x02\x02\x02\n/\x03\x02\x02\x02\f5\x03\x02\x02\x02" +
		"\x0E>\x03\x02\x02\x02\x10B\x03\x02\x02\x02\x12Z\x03\x02\x02\x02\x14\\" +
		"\x03\x02\x02\x02\x16^\x03\x02\x02\x02\x18l\x03\x02\x02\x02\x1Aw\x03\x02" +
		"\x02\x02\x1C\x1E\x05\x04\x03\x02\x1D\x1C\x03\x02\x02\x02\x1E!\x03\x02" +
		"\x02\x02\x1F\x1D\x03\x02\x02\x02\x1F \x03\x02\x02\x02 \x03\x03\x02\x02" +
		"\x02!\x1F\x03\x02\x02\x02\"&\x05\n\x06\x02#&\x05\x06\x04\x02$&\x05\b\x05" +
		"\x02%\"\x03\x02\x02\x02%#\x03\x02\x02\x02%$\x03\x02\x02\x02&\x05\x03\x02" +
		"\x02\x02\'(\x07\x03\x02\x02()\x07\x17\x02\x02)*\x05\x16\f\x02*\x07\x03" +
		"\x02\x02\x02+,\x07\x04\x02\x02,-\x07\x17\x02\x02-.\x05\x18\r\x02.\t\x03" +
		"\x02\x02\x02/0\x07\x05\x02\x0201\x07\x17\x02\x0212\x07\x19\x02\x0223\x07" +
		"\x17\x02\x0234\x05\f\x07\x024\v\x03\x02\x02\x0259\x07\x06\x02\x0268\x05" +
		"\x0E\b\x0276\x03\x02\x02\x028;\x03\x02\x02\x0297\x03\x02\x02\x029:\x03" +
		"\x02\x02\x02:<\x03\x02\x02\x02;9\x03\x02\x02\x02<=\x07\x07\x02\x02=\r" +
		"\x03\x02\x02\x02>?\x07\x17\x02\x02?@\x07\b\x02\x02@A\x05\x18\r\x02A\x0F" +
		"\x03\x02\x02\x02BF\x07\t\x02\x02CE\x05\x18\r\x02DC\x03\x02\x02\x02EH\x03" +
		"\x02\x02\x02FD\x03\x02\x02\x02FG\x03\x02\x02\x02GI\x03\x02\x02\x02HF\x03" +
		"\x02\x02\x02IJ\x07\n\x02\x02J\x11\x03\x02\x02\x02KL\x07\x17\x02\x02LM" +
		"\x07\v\x02\x02M[\x07\f\x02\x02NO\x07\x17\x02\x02OP\x07\v\x02\x02PU\x05" +
		"\x18\r\x02QR\x07\r\x02\x02RT\x05\x18\r\x02SQ\x03\x02\x02\x02TW\x03\x02" +
		"\x02\x02US\x03\x02\x02\x02UV\x03\x02\x02\x02VX\x03\x02\x02\x02WU\x03\x02" +
		"\x02\x02XY\x07\f\x02\x02Y[\x03\x02\x02\x02ZK\x03\x02\x02\x02ZN\x03\x02" +
		"\x02\x02[\x13\x03\x02\x02\x02\\]\x07\x17\x02\x02]\x15\x03\x02\x02\x02" +
		"^_\t\x02\x02\x02_\x17\x03\x02\x02\x02`m\x07\x19\x02\x02am\x07\x18\x02" +
		"\x02bm\x07\x14\x02\x02cm\x07\x15\x02\x02dm\x05\f\x07\x02em\x05\x10\t\x02" +
		"fg\x05\x14\v\x02gh\x05\x1A\x0E\x02hm\x03\x02\x02\x02ij\x05\x12\n\x02j" +
		"k\x05\x1A\x0E\x02km\x03\x02\x02\x02l`\x03\x02\x02\x02la\x03\x02\x02\x02" +
		"lb\x03\x02\x02\x02lc\x03\x02\x02\x02ld\x03\x02\x02\x02le\x03\x02\x02\x02" +
		"lf\x03\x02\x02\x02li\x03\x02\x02\x02m\x19\x03\x02\x02\x02no\x07\x16\x02" +
		"\x02op\x05\x14\v\x02pq\x05\x1A\x0E\x02qx\x03\x02\x02\x02rs\x07\x16\x02" +
		"\x02st\x05\x12\n\x02tu\x05\x1A\x0E\x02ux\x03\x02\x02\x02vx\x03\x02\x02" +
		"\x02wn\x03\x02\x02\x02wr\x03\x02\x02\x02wv\x03\x02\x02\x02x\x1B\x03\x02" +
		"\x02\x02\n\x1F%9FUZlw";
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
	public Identifier(): TerminalNode { return this.getToken(ArmLangParser.Identifier, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
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


