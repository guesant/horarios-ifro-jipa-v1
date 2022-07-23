const getDOMParser = async () => {
  if (typeof DOMParser !== "undefined") {
    return DOMParser;
  }

  return import("xmldom").then(({ DOMParser }) => DOMParser);
};

export const parseDocument = async (html: string): Promise<Document> => {
  const DOMParser = await getDOMParser();

  const parser = new DOMParser();

  return parser.parseFromString(html, "text/html");
};
