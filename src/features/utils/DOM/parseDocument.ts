import { getDOMParser } from "./getDOMParser";

export const parseDocument = async (html: string): Promise<Document> => {
  const DOMParser = await getDOMParser();

  const parser = new DOMParser();

  return parser.parseFromString(html, "text/html");
};
