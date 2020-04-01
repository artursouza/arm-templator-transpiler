# arm-templator-transpiler (prototype)

## Compiling the .arm file into an ARM Template
Run the following to watch a .arm file and create a same-named .json whenever there are changes:

```
npm install
npm run watch <path to .arm file>
```

e.g. the following will watch `tests/basic.arm` file and transpile to `tests/basic.json` when changes are detected: 
```
npm install
npm run watch tests/basic.arm
```

## Usage
* [Quality of life improvements]()
* [Declaring a resource]()
* [Using parameters and variables]()
* [Modules]()
* [Using ARM functions]()
* [Referencing objects and property access]()

### Quality of life improvements
* No quotes on property names
* Access variables/objects/functions directly without an expression syntax ([])
* Use an object reference to get properties like resourceId or GET properties like...
* Modules for breaking down code
* Automatic dependsOn generation
* Inputs (parameters), Variables, Resources, Outputs can be declared intermittently (e.g. Input -> Input -> Resource -> Output -> Resource)

### Declaring a resource
```
resource [azrm | mod] '{resourceProvider}/{resourceType}@{apiVersion}' objectName {
    // from here, declare your resource as you normally would (less the unncessary JSON cruft)
} 
```

Sample:
```
resource azrm 'network/virtualNetworks@2016-03-30' vnet {
    name: concat(namePrefix, 'vnet')
    location: location
    properties: {
        addressSpace: {
            addressPrefix: '10.0.0.0/16'
        }
    }
}
```

### Using Inputs (Parameters) and Variables
An `input` will compile to an ARM Template Parameter. All the ARM Template parameter types are supported. Default values and other parameter metadata is **not** supported at this time.

Parameters are declared as:
```
input [string | securestring | object | int | bool] inputName
```

Sample:
```
input string location
```

### Limitations
* It *only* generates an ARM template, so you will always deploy the compiled template
* No tooling support beyond syntax highlighting. You won't get any template validation in the .arm file
* Auto-dependency mapping is a little funky if you use modules
* defaultValue and parameter metadata is not yet suppoprted
* looping (copy) and conditions are not yet supported

## Syntax highlighting
Copy the `vscode-armlang` folder into your [VSCode extension folder](https://vscode-docs.readthedocs.io/en/stable/extensions/install-extension/#your-extensions-folder).

## Testing approach

### Who are we targeting?
* SREs/server admins/etc with a Linux background [Bart]

### Hypotheses
* someone with a linux background will turn their nose up at powershell, but you can get powershell folks to try something else
    - if this turns out not to be true, then the answer to hypo #2 does not matter
* there is a larger group of user that have a linux background, than a windows background
    - is that accurate?
    - this does not necessarily dictate 
    - but we don't want to alienate linux OR windows ppl
* we think that doing something friendlier to linux admins will make them consider azure more
    - how do we know what we do is friendly to linux ppl?

### What are we trying to learn?
1. Between New DSL and PowerShell DSL, what did they like in each? if they had to choose, which one and why?
1. Is this new language viable or should we use an existing one like PowerShell or TypeScript?
1. How useful & effective are modules?
1. Have we improved readability?
1. How do they evaluate the things we are improving?
   - Readability*
   - looping
   - conditions
   - modules*
   - object references & easier property access*

### Research steps
1. Small cohort of 10 people to go *deep*
    - individual
    - use what we learn there and go broader with an offline survey
    - persona selection here is very important
    - if we don't feel confident with the results, we can do more
    - meet with mark russ
1. Send out a broader quantative survey
1. If we have a clear direction, release a prototype publicly as an experiment

## Language changes
1. Edit `src\antlr4\ArmLang.g4`.
2. Run `npm run antlr` to compile and generate Typescript.
