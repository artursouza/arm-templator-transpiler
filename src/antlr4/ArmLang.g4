grammar ArmLang;

program
    : (section | module)*
    ;

section
    : resource
    | variable
    | inputDecl
    | outputDecl
    ;

inputDecl
    : 'input' type Identifier
    ;

outputDecl
    : 'output' Identifier ':' property
    ;

resource
    : 'resource' Identifier String Identifier object
    ;

variable
    : 'variable' Identifier property
    ;

module
    : ('export'|) 'module' Identifier '{' (section)* '}'
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

propertyCall
    : Identifier
    ;

Identifier
    : NonDigit
        (   NonDigit
        |   Digit
        )*
    ;

Number
    : Digit+
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
    : '.' propertyCall propertyTail
    | /* epsilon */
    ;

fragment NonDigit
    : [a-zA-Z_]
    ;

fragment Digit
    : [0-9]
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