import { getDOMParserPolyfill } from "./polyfills/getDOMParserPolyfill";

export const getDOMParserInstance = () =>
  typeof DOMParser !== "undefined"
    ? Promise.resolve(new DOMParser())
    : getDOMParserPolyfill().then(
        (dp) =>
          new dp({
            locator: {},
            errorHandler: {
              warning: function (w) {},
              error: function (e) {},
              fatalError: function (e) {
                console.error(e);
              },
            },
          })
      );
