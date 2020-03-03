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
	public static readonly Identifier = 9;
	public static readonly Number = 10;
	public static readonly String = 11;
	public static readonly WS = 12;
	public static readonly RULE_program = 0;
	public static readonly RULE_section = 1;
	public static readonly RULE_resource = 2;
	public static readonly RULE_object = 3;
	public static readonly RULE_objectProperty = 4;
	public static readonly RULE_array = 5;
	public static readonly RULE_property = 6;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "section", "resource", "object", "objectProperty", "array", 
		"property",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'resource'", "'{'", "'}'", "':'", "'['", "']'", "'true'", 
		"'false'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, "Identifier", "Number", "String", "WS",
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
			this.state = 17;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ArmLangParser.T__0) {
				{
				{
				this.state = 14;
				this.section();
				}
				}
				this.state = 19;
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
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 20;
			this.resource();
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
		this.enterRule(_localctx, 4, ArmLangParser.RULE_resource);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 22;
			this.match(ArmLangParser.T__0);
			this.state = 23;
			this.match(ArmLangParser.Identifier);
			this.state = 24;
			this.match(ArmLangParser.Identifier);
			this.state = 25;
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
		this.enterRule(_localctx, 6, ArmLangParser.RULE_object);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 27;
			this.match(ArmLangParser.T__1);
			this.state = 31;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ArmLangParser.Identifier) {
				{
				{
				this.state = 28;
				this.objectProperty();
				}
				}
				this.state = 33;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 34;
			this.match(ArmLangParser.T__2);
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
		this.enterRule(_localctx, 8, ArmLangParser.RULE_objectProperty);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 36;
			this.match(ArmLangParser.Identifier);
			this.state = 37;
			this.match(ArmLangParser.T__3);
			this.state = 38;
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
		this.enterRule(_localctx, 10, ArmLangParser.RULE_array);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 40;
			this.match(ArmLangParser.T__4);
			this.state = 44;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ArmLangParser.T__1) | (1 << ArmLangParser.T__4) | (1 << ArmLangParser.T__6) | (1 << ArmLangParser.T__7) | (1 << ArmLangParser.Identifier) | (1 << ArmLangParser.Number) | (1 << ArmLangParser.String))) !== 0)) {
				{
				{
				this.state = 41;
				this.property();
				}
				}
				this.state = 46;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 47;
			this.match(ArmLangParser.T__5);
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
		this.enterRule(_localctx, 12, ArmLangParser.RULE_property);
		try {
			this.state = 56;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ArmLangParser.String:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 49;
				this.match(ArmLangParser.String);
				}
				break;
			case ArmLangParser.Number:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 50;
				this.match(ArmLangParser.Number);
				}
				break;
			case ArmLangParser.T__6:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 51;
				this.match(ArmLangParser.T__6);
				}
				break;
			case ArmLangParser.T__7:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 52;
				this.match(ArmLangParser.T__7);
				}
				break;
			case ArmLangParser.Identifier:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 53;
				this.match(ArmLangParser.Identifier);
				}
				break;
			case ArmLangParser.T__1:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 54;
				this.object();
				}
				break;
			case ArmLangParser.T__4:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 55;
				this.array();
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x0E=\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x03\x02\x07\x02\x12\n\x02\f\x02\x0E\x02\x15\v\x02\x03" +
		"\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x07" +
		"\x05 \n\x05\f\x05\x0E\x05#\v\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x07\x03\x07\x07\x07-\n\x07\f\x07\x0E\x070\v\x07\x03\x07\x03" +
		"\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05\b;\n\b\x03\b\x02\x02" +
		"\x02\t\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x02\x02\x02>" +
		"\x02\x13\x03\x02\x02\x02\x04\x16\x03\x02\x02\x02\x06\x18\x03\x02\x02\x02" +
		"\b\x1D\x03\x02\x02\x02\n&\x03\x02\x02\x02\f*\x03\x02\x02\x02\x0E:\x03" +
		"\x02\x02\x02\x10\x12\x05\x04\x03\x02\x11\x10\x03\x02\x02\x02\x12\x15\x03" +
		"\x02\x02\x02\x13\x11\x03\x02\x02\x02\x13\x14\x03\x02\x02\x02\x14\x03\x03" +
		"\x02\x02\x02\x15\x13\x03\x02\x02\x02\x16\x17\x05\x06\x04\x02\x17\x05\x03" +
		"\x02\x02\x02\x18\x19\x07\x03\x02\x02\x19\x1A\x07\v\x02\x02\x1A\x1B\x07" +
		"\v\x02\x02\x1B\x1C\x05\b\x05\x02\x1C\x07\x03\x02\x02\x02\x1D!\x07\x04" +
		"\x02\x02\x1E \x05\n\x06\x02\x1F\x1E\x03\x02\x02\x02 #\x03\x02\x02\x02" +
		"!\x1F\x03\x02\x02\x02!\"\x03\x02\x02\x02\"$\x03\x02\x02\x02#!\x03\x02" +
		"\x02\x02$%\x07\x05\x02\x02%\t\x03\x02\x02\x02&\'\x07\v\x02\x02\'(\x07" +
		"\x06\x02\x02()\x05\x0E\b\x02)\v\x03\x02\x02\x02*.\x07\x07\x02\x02+-\x05" +
		"\x0E\b\x02,+\x03\x02\x02\x02-0\x03\x02\x02\x02.,\x03\x02\x02\x02./\x03" +
		"\x02\x02\x02/1\x03\x02\x02\x020.\x03\x02\x02\x0212\x07\b\x02\x022\r\x03" +
		"\x02\x02\x023;\x07\r\x02\x024;\x07\f\x02\x025;\x07\t\x02\x026;\x07\n\x02" +
		"\x027;\x07\v\x02\x028;\x05\b\x05\x029;\x05\f\x07\x02:3\x03\x02\x02\x02" +
		":4\x03\x02\x02\x02:5\x03\x02\x02\x02:6\x03\x02\x02\x02:7\x03\x02\x02\x02" +
		":8\x03\x02\x02\x02:9\x03\x02\x02\x02;\x0F\x03\x02\x02\x02\x06\x13!.:";
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
	public resource(): ResourceContext {
		return this.getRuleContext(0, ResourceContext);
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


