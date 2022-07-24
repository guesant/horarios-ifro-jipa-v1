import { getDOMParserInstance } from "./getDOMParserInstance";

export const parseDocument = async (html: string): Promise<Document> => {
  const parser = await getDOMParserInstance();
  return parser.parseFromString(html, "text/html");
};
