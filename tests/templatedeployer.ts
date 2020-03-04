import { Deployer, Property } from '../src/common' ;
import { Dictionary } from 'lodash';
import { buildAst } from '../src/execute';
import { printJsModule } from '../src/printer';

class IdentifierProperty extends Property {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
}

class CallProperty extends Property {
  name: string;
  params: Property[];
  constructor(name: string, params: Property[]) {
    super();
    this.name = name;
    this.params = params;
  }
}

interface ResourceDef {
  properties: any;
  type: string;
}

interface OutputDef {
  type: string;
  value: any;
}

interface ParamDef {
  type: string;
}

export class TemplateDeployer implements Deployer {
  private params: Dictionary<ParamDef> = {};
  private outputs: Dictionary<OutputDef> = {};
  private resources: Dictionary<ResourceDef> = {};

  input(name: string, type: string) {
    this.params[name] = {
      type,
    };
  }
  
  resource(provider: string, type: string, name: string, properties: any): void {
    this.resources[name] = {
      properties,
      type,
    };
  }

  output(name: string, value: any) {
    this.outputs[name] = {
      type: 'string',
      value: value,
    };
  }

  identifier(name: string): Property {
    return new IdentifierProperty(name);
  }

  call(name: string, properties: Property[]): Property {
    return new CallProperty(name, properties);
  }

  renderParams(): Dictionary<any> {
    return this.params;
  }

  renderResources(): any[] {
    const outputs = [];
    for (const key of Object.keys(this.resources)) {
      outputs.push(this.renderObject(this.resources[key].properties));
    }

    return outputs;
  }

  renderOutputs(): Dictionary<any> {
    const outputs: any = {};
    for (const key of Object.keys(this.outputs)) {
      outputs[key] = {
        type: this.outputs[key].type,
        value: this.renderObject(this.outputs[key].value),
      }
    }

    return outputs;
  }

  renderProperty(input: Property): any {
    if (input instanceof IdentifierProperty) {
      if (this.params[input.name]) {
        return `parameters('${input.name}')`;
      }

      throw new Error(`Unable to find param '${input.name}'`);
    }

    if (input instanceof CallProperty) {
      switch (input.name) {
        case 'resourceId':
          const resource = this.resources[(input.params[0] as IdentifierProperty).name];
          return `resourceId('${resource.type}')`;
        case 'concat':
          return `concat(${input.params.map(p => typeof p === 'string' ? `'${p}'` : this.renderProperty(p)).join(', ')})`;
      }

      throw new Error(`Unable to handle function '${input.name}'`);
    }
  }

  renderObject(input: any): any {
    if (input instanceof Property) {
      return `[${this.renderProperty(input)}]`;
    }

    if (Array.isArray(input)) {
      return input.map(this.renderObject);
    }

    if (typeof input === 'object') {
      const output: any = {};
      for (const key of Object.keys(input)) {
        output[key] = this.renderObject(input[key]);
      }
      return output;
    }

    return input;
  }

  render(): string {
    const template = {
      $schema: 'https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#',
      contentVersion: '1.0.0.0',
      parameters: this.renderParams(),
      resources: this.renderResources(),
      outputs: this.renderOutputs(),
    }
    
    return JSON.stringify(template, null, 2);
  }
}

function requireFromString(src: any, filename: string) {
  const Module: any = module.constructor;
  var m = new Module();
  m.paths = module.paths;
  m._compile(src, filename);
  return m.exports;
}

export function renderTemplate(input: string) {
  const ast = buildAst(input);
  const jsModule = printJsModule(ast);
  const renderer = requireFromString(jsModule, '<template>');

  return renderer.render(new TemplateDeployer());
}