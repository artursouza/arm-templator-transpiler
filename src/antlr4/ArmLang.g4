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
    : 'input' Identifier type
    ;

outputDecl
    : 'output' Identifier property
    ;

resource
    : 'resource' Identifier String Identifier object
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

identifierCall
    : Identifier
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

type
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
    | object
    | array
    | identifierCall propertyTail
    | functionCall propertyTail
    ;

propertyTail
    : '.' identifierCall propertyTail
    | '.' functionCall propertyTail
    | /* epsilon */
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

BlockComment
    : '/*' .*? '*/' -> channel(HIDDEN)
    ;

LineComment
    : '//' ~[\r\n]* -> channel(HIDDEN)
    ;

Whitespace
    : [ \t\r\n\u000C]+ -> channel(HIDDEN)
    ;