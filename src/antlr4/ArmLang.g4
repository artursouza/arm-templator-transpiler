grammar ArmLang;

program
    : (section)*
    ;

section
    : resource
    | inputDecl
    | outputDecl
    ;

inputDecl
    : 'input' Identifier Type
    ;

outputDecl
    : 'output' Identifier property
    ;

resource
    : 'resource' Identifier Identifier object
    ;

object
    : '{' objectProperty* '}'
    ;

objectProperty
    : Identifier ':' property
    ;

array
    : '[' property* ']'
    ;

functionCall
    : Identifier '(' ')'
    | Identifier '(' property (',' property)* ')'
    ;

Identifier
    : NonDigit
        (   NonDigit
        |   Digit
        )*
    ;

Number
    : NonzeroDigit Digit*
    ;

String
    : '\'' StringChar* '\''
    ;

Type
    : 'string'
    | 'securestring'
    | 'int'
    | 'bool'
    | 'object'
    | 'array'
    ;

property
    : String
    | Number
    | 'true'
    | 'false'
    | Identifier
    | object
    | array
    | functionCall
    ;

fragment NonDigit
    : [a-zA-Z_]
    ;

fragment Digit
    : [0-9]
    ;

fragment NonzeroDigit
    : [1-9]
    ;

fragment StringEscapeSequence
    :   '\\' ['\\rn]
    ;

fragment StringChar
    : ~['\\\r\n]
    | StringEscapeSequence
    ;

WS
    : [ \t\r\n\u000C]+ -> channel(HIDDEN)
    ;