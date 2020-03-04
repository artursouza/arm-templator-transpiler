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
	public static readonly WS = 24;
	public static readonly RULE_program = 0;
	public static readonly RULE_section = 1;
	public static readonly RULE_inputDecl = 2;
	public static readonly RULE_outputDecl = 3;
	public static readonly RULE_resource = 4;
	public static readonly RULE_object = 5;
	public static readonly RULE_objectProperty = 6;
	public static readonly RULE_array = 7;
	public static readonly RULE_functionCall = 8;
	public static readonly RULE_propertyAccess = 9;
	public static readonly RULE_type = 10;
	public static readonly RULE_property = 11;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "section", "inputDecl", "outputDecl", "resource", "object", 
		"objectProperty", "array", "functionCall", "propertyAccess", "type", "property",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'input'", "'output'", "'resource'", "'{'", "'}'", "':'", "'['", 
		"']'", "'('", "')'", "','", "'.'", "'string'", "'securestring'", "'int'", 
		"'bool'", "'object'", "'array'", "'true'", "'false'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"Identifier", "Number", "String", "WS",
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
			this.state = 27;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ArmLangParser.T__0) | (1 << ArmLangParser.T__1) | (1 << ArmLangParser.T__2))) !== 0)) {
				{
				{
				this.state = 24;
				this.section();
				}
				}
				this.state = 29;
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
			this.state = 33;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ArmLangParser.T__2:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 30;
				this.resource();
				}
				break;
			case ArmLangParser.T__0:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 31;
				this.inputDecl();
				}
				break;
			case ArmLangParser.T__1:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 32;
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
			this.state = 35;
			this.match(ArmLangParser.T__0);
			this.state = 36;
			this.match(ArmLangParser.Identifier);
			this.state = 37;
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
			this.state = 39;
			this.match(ArmLangParser.T__1);
			this.state = 40;
			this.match(ArmLangParser.Identifier);
			this.state = 41;
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
			this.state = 43;
			this.match(ArmLangParser.T__2);
			this.state = 44;
			this.match(ArmLangParser.Identifier);
			this.state = 45;
			this.match(ArmLangParser.String);
			this.state = 46;
			this.match(ArmLangParser.Identifier);
			this.state = 47;
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
			this.state = 49;
			this.match(ArmLangParser.T__3);
			this.state = 53;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ArmLangParser.Identifier) {
				{
				{
				this.state = 50;
				this.objectProperty();
				}
				}
				this.state = 55;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 56;
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
			this.state = 58;
			this.match(ArmLangParser.Identifier);
			this.state = 59;
			this.match(ArmLangParser.T__5);
			this.state = 60;
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
			this.state = 62;
			this.match(ArmLangParser.T__6);
			this.state = 66;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ArmLangParser.T__3) | (1 << ArmLangParser.T__6) | (1 << ArmLangParser.T__18) | (1 << ArmLangParser.T__19) | (1 << ArmLangParser.Identifier) | (1 << ArmLangParser.Number) | (1 << ArmLangParser.String))) !== 0)) {
				{
				{
				this.state = 63;
				this.property();
				}
				}
				this.state = 68;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 69;
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
			this.state = 86;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 71;
				this.match(ArmLangParser.Identifier);
				this.state = 72;
				this.match(ArmLangParser.T__8);
				this.state = 73;
				this.match(ArmLangParser.T__9);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 74;
				this.match(ArmLangParser.Identifier);
				this.state = 75;
				this.match(ArmLangParser.T__8);
				this.state = 76;
				this.property();
				this.state = 81;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ArmLangParser.T__10) {
					{
					{
					this.state = 77;
					this.match(ArmLangParser.T__10);
					this.state = 78;
					this.property();
					}
					}
					this.state = 83;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 84;
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
	public propertyAccess(): PropertyAccessContext {
		let _localctx: PropertyAccessContext = new PropertyAccessContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, ArmLangParser.RULE_propertyAccess);
		try {
			this.state = 95;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 88;
				this.match(ArmLangParser.Identifier);
				this.state = 89;
				this.match(ArmLangParser.T__11);
				this.state = 90;
				this.match(ArmLangParser.Identifier);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 91;
				this.match(ArmLangParser.Identifier);
				this.state = 92;
				this.match(ArmLangParser.T__6);
				this.state = 93;
				this.match(ArmLangParser.Number);
				this.state = 94;
				this.match(ArmLangParser.T__7);
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
	public type(): TypeContext {
		let _localctx: TypeContext = new TypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, ArmLangParser.RULE_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 97;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ArmLangParser.T__12) | (1 << ArmLangParser.T__13) | (1 << ArmLangParser.T__14) | (1 << ArmLangParser.T__15) | (1 << ArmLangParser.T__16) | (1 << ArmLangParser.T__17))) !== 0))) {
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
			this.state = 108;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 99;
				this.match(ArmLangParser.String);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 100;
				this.match(ArmLangParser.Number);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 101;
				this.match(ArmLangParser.T__18);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 102;
				this.match(ArmLangParser.T__19);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 103;
				this.match(ArmLangParser.Identifier);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 104;
				this.object();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 105;
				this.array();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 106;
				this.functionCall();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 107;
				this.propertyAccess();
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1Aq\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x03" +
		"\x02\x07\x02\x1C\n\x02\f\x02\x0E\x02\x1F\v\x02\x03\x03\x03\x03\x03\x03" +
		"\x05\x03$\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05" +
		"\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07" +
		"\x07\x076\n\x07\f\x07\x0E\x079\v\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b" +
		"\x03\b\x03\t\x03\t\x07\tC\n\t\f\t\x0E\tF\v\t\x03\t\x03\t\x03\n\x03\n\x03" +
		"\n\x03\n\x03\n\x03\n\x03\n\x03\n\x07\nR\n\n\f\n\x0E\nU\v\n\x03\n\x03\n" +
		"\x05\nY\n\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x05\vb\n\v\x03\f" +
		"\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x05\ro\n" +
		"\r\x03\r\x02\x02\x02\x0E\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E" +
		"\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x02\x03\x03\x02\x0F\x14\x02" +
		"t\x02\x1D\x03\x02\x02\x02\x04#\x03\x02\x02\x02\x06%\x03\x02\x02\x02\b" +
		")\x03\x02\x02\x02\n-\x03\x02\x02\x02\f3\x03\x02\x02\x02\x0E<\x03\x02\x02" +
		"\x02\x10@\x03\x02\x02\x02\x12X\x03\x02\x02\x02\x14a\x03\x02\x02\x02\x16" +
		"c\x03\x02\x02\x02\x18n\x03\x02\x02\x02\x1A\x1C\x05\x04\x03\x02\x1B\x1A" +
		"\x03\x02\x02\x02\x1C\x1F\x03\x02\x02\x02\x1D\x1B\x03\x02\x02\x02\x1D\x1E" +
		"\x03\x02\x02\x02\x1E\x03\x03\x02\x02\x02\x1F\x1D\x03\x02\x02\x02 $\x05" +
		"\n\x06\x02!$\x05\x06\x04\x02\"$\x05\b\x05\x02# \x03\x02\x02\x02#!\x03" +
		"\x02\x02\x02#\"\x03\x02\x02\x02$\x05\x03\x02\x02\x02%&\x07\x03\x02\x02" +
		"&\'\x07\x17\x02\x02\'(\x05\x16\f\x02(\x07\x03\x02\x02\x02)*\x07\x04\x02" +
		"\x02*+\x07\x17\x02\x02+,\x05\x18\r\x02,\t\x03\x02\x02\x02-.\x07\x05\x02" +
		"\x02./\x07\x17\x02\x02/0\x07\x19\x02\x0201\x07\x17\x02\x0212\x05\f\x07" +
		"\x022\v\x03\x02\x02\x0237\x07\x06\x02\x0246\x05\x0E\b\x0254\x03\x02\x02" +
		"\x0269\x03\x02\x02\x0275\x03\x02\x02\x0278\x03\x02\x02\x028:\x03\x02\x02" +
		"\x0297\x03\x02\x02\x02:;\x07\x07\x02\x02;\r\x03\x02\x02\x02<=\x07\x17" +
		"\x02\x02=>\x07\b\x02\x02>?\x05\x18\r\x02?\x0F\x03\x02\x02\x02@D\x07\t" +
		"\x02\x02AC\x05\x18\r\x02BA\x03\x02\x02\x02CF\x03\x02\x02\x02DB\x03\x02" +
		"\x02\x02DE\x03\x02\x02\x02EG\x03\x02\x02\x02FD\x03\x02\x02\x02GH\x07\n" +
		"\x02\x02H\x11\x03\x02\x02\x02IJ\x07\x17\x02\x02JK\x07\v\x02\x02KY\x07" +
		"\f\x02\x02LM\x07\x17\x02\x02MN\x07\v\x02\x02NS\x05\x18\r\x02OP\x07\r\x02" +
		"\x02PR\x05\x18\r\x02QO\x03\x02\x02\x02RU\x03\x02\x02\x02SQ\x03\x02\x02" +
		"\x02ST\x03\x02\x02\x02TV\x03\x02\x02\x02US\x03\x02\x02\x02VW\x07\f\x02" +
		"\x02WY\x03\x02\x02\x02XI\x03\x02\x02\x02XL\x03\x02\x02\x02Y\x13\x03\x02" +
		"\x02\x02Z[\x07\x17\x02\x02[\\\x07\x0E\x02\x02\\b\x07\x17\x02\x02]^\x07" +
		"\x17\x02\x02^_\x07\t\x02\x02_`\x07\x18\x02\x02`b\x07\n\x02\x02aZ\x03\x02" +
		"\x02\x02a]\x03\x02\x02\x02b\x15\x03\x02\x02\x02cd\t\x02\x02\x02d\x17\x03" +
		"\x02\x02\x02eo\x07\x19\x02\x02fo\x07\x18\x02\x02go\x07\x15\x02\x02ho\x07" +
		"\x16\x02\x02io\x07\x17\x02\x02jo\x05\f\x07\x02ko\x05\x10\t\x02lo\x05\x12" +
		"\n\x02mo\x05\x14\v\x02ne\x03\x02\x02\x02nf\x03\x02\x02\x02ng\x03\x02\x02" +
		"\x02nh\x03\x02\x02\x02ni\x03\x02\x02\x02nj\x03\x02\x02\x02nk\x03\x02\x02" +
		"\x02nl\x03\x02\x02\x02nm\x03\x02\x02\x02o\x19\x03\x02\x02\x02\n\x1D#7" +
		"DSXan";
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


export class PropertyAccessContext extends ParserRuleContext {
	public Identifier(): TerminalNode[];
	public Identifier(i: number): TerminalNode;
	public Identifier(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ArmLangParser.Identifier);
		} else {
			return this.getToken(ArmLangParser.Identifier, i);
		}
	}
	public Number(): TerminalNode | undefined { return this.tryGetToken(ArmLangParser.Number, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArmLangParser.RULE_propertyAccess; }
	// @Override
	public enterRule(listener: ArmLangListener): void {
		if (listener.enterPropertyAccess) {
			listener.enterPropertyAccess(this);
		}
	}
	// @Override
	public exitRule(listener: ArmLangListener): void {
		if (listener.exitPropertyAccess) {
			listener.exitPropertyAccess(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArmLangVisitor<Result>): Result {
		if (visitor.visitPropertyAccess) {
			return visitor.visitPropertyAccess(this);
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
	public Identifier(): TerminalNode | undefined { return this.tryGetToken(ArmLangParser.Identifier, 0); }
	public object(): ObjectContext | undefined {
		return this.tryGetRuleContext(0, ObjectContext);
	}
	public array(): ArrayContext | undefined {
		return this.tryGetRuleContext(0, ArrayContext);
	}
	public functionCall(): FunctionCallContext | undefined {
		return this.tryGetRuleContext(0, FunctionCallContext);
	}
	public propertyAccess(): PropertyAccessContext | undefined {
		return this.tryGetRuleContext(0, PropertyAccessContext);
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


