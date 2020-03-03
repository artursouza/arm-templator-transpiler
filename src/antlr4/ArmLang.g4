grammar ArmLang;

program
    : (section)*
    ;

section
    : resource
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

property
    : String
    | Number
    | 'true'
    | 'false'
    | Identifier
    | object
    | array
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
    : [ \t\n\r] + -> skip
    ;