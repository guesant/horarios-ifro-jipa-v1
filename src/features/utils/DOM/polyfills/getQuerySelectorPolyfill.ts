export const getQuerySelectorPolyfill = () =>
  import("query-selector").then((module) => module.default);
