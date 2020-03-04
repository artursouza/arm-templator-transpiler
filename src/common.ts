export abstract class Property {
}

export interface Deployer {
  input(name: string, type: string): void;
  resource(provider: string, type: string, name: string, properties: any): void;
  output(name: string, value: any): void;
  identifier(name: string): Property;
  call(name: string, properties: Property[]): Property;
  render(): string;
}