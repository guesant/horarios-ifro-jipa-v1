import { querySelectorAll } from "./querySelectorAll";

export const querySelector = async <T extends Element = Element>(
  query: string,
  doc: Document | Element | Node
): Promise<T> => {
  const docAsEl = doc as Element;

  if (typeof docAsEl.querySelector !== "undefined") {
    return docAsEl.querySelector<T>(query)!;
  }

  const [match] = await querySelectorAll<T>(query, doc);
  return match;
};
