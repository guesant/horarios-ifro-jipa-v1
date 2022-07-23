export const getDOMParserPolyfill = () =>
  import("xmldom").then(({ DOMParser }) => DOMParser);
