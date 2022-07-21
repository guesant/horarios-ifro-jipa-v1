export const extractPDFAttachmentFromTopicDocument = (doc: Document) => {
  const anchorElement = doc.querySelector<HTMLAnchorElement>(
    '[data-content="forum-discussion"] a[href*=".pdf"]'
  );

  return anchorElement?.href;
};
