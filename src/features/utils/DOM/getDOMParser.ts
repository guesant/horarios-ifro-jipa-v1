import { getDOMParserPolyfill } from "./polyfills/getDOMParserPolyfill";

export const getDOMParser = () =>
  typeof DOMParser !== "undefined"
    ? Promise.resolve(DOMParser)
    : getDOMParserPolyfill();
