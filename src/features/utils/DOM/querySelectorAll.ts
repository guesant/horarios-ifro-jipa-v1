const getQuerySelectorPolyfill = () =>
  import("query-selector").then((module) => module.default);

export const querySelectorAll = async <T extends Element = Element>(
  query: string,
  doc: Node | Element
): Promise<NodeListOf<T>> => {
  if (typeof (doc as Element).querySelectorAll !== "undefined") {
    return (doc as Element).querySelectorAll<T>(query);
  }

  return getQuerySelectorPolyfill().then((qs) => qs(query, doc));
};
