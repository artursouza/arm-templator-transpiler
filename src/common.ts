export abstract class Property {
}

export interface Deployer {
  input(name: string, type: string): void;
  resource(provider: string, type: string, name: string, properties: Property[]): void;
  output(name: string, value: any): void;
  identifier(name: string): Property;
  call(name: string, properties: Property[]): Property;
}