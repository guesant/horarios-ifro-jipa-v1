import { querySelectorAll } from "./querySelectorAll";

export const querySelector = async <T extends Element = Element>(
  query: string,
  doc: Element | Node
): Promise<T> => {
  const [match] = await querySelectorAll<T>(query, doc);
  return match;
};
