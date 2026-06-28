// Minimal ambient declaration for the 'cookie' package types
declare module "cookie" {
  export function parse(str: string, options?: any): Record<string, string>;
  export function serialize(name: string, val: string, options?: any): string;
  const cookie: {
    parse: typeof parse;
    serialize: typeof serialize;
  };
  export default cookie;
}
