declare module "query-selector" {
  const qs = <T extends Element = Element>(query: string, doc: Document|Node|Element) => NodeListOf<T>;

  export default qs;
}


declare module "cache-service-cache-module"