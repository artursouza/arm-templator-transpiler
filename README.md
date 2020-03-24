# arm-templator-transpiler (prototype)

## Testing
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

## Syntax highlighting
Copy the `vscode-armlang` folder into your [VSCode extension folder](https://vscode-docs.readthedocs.io/en/stable/extensions/install-extension/#your-extensions-folder).

## Language changes
1. Edit `src\antlr4\ArmLang.g4`.
2. Run `npm run antlr` to compile and generate Typescript.
