export const parseDocument = (html: string): Document => {
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html");
};
