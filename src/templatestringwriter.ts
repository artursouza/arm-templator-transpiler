import { TemplateWriter } from "./visitors/common";
import { Dictionary } from "lodash";

export class TemplateStringWriter implements TemplateWriter {
  private parameters: Dictionary<any> = {};
  private resources: any[] = [];
  private outputs: Dictionary<any> = {};

  writeParameter(name: string, variable: any) {
    this.parameters[name] = variable;
  }

  writeResource(resource: any) {
    this.resources.push(resource);
  }

  writeOutput(name: string, variable: any) {
    this.outputs[name] = variable;
  }

  read() {
    const template = {
      $schema: 'https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#',
      contentVersion: '1.0.0.0',
      parameters: this.parameters,
      resources: this.resources,
      outputs: this.outputs,
    };

    return JSON.stringify(template, null, 2);
  }
}