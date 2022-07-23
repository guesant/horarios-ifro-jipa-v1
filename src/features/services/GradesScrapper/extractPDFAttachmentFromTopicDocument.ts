import { querySelector } from "../../utils/DOM/querySelector";

export const extractPDFAttachmentFromTopicDocument = async (doc: Document) => {
  const anchorElement = await querySelector<HTMLAnchorElement>(
    '[data-content="forum-discussion"] a[href*=".pdf"]',
    doc
  );

  return anchorElement?.getAttribute("href");
};
