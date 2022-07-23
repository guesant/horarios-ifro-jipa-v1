import { fetchForumTopicPDFAttachmentLink } from "./fetchForumTopicPDFAttachmentLink";
import { getCached, setCached } from "../../utils/cacheModule";

export const cachedFetchForumTopicPDFAttachmentLink = async (url: string) => {
  const targetCacheKey = `pdfAttachmentLink-${url}`;

  const cachedPDFAttachmentLink = await getCached<string>(targetCacheKey);

  if (cachedPDFAttachmentLink) {
    return cachedPDFAttachmentLink;
  }

  const pdfAttachmentLink = await fetchForumTopicPDFAttachmentLink(url);

  if (pdfAttachmentLink) {
    requestIdleCallback(async () => {
      await setCached(targetCacheKey, pdfAttachmentLink);
    });
  }

  return pdfAttachmentLink;
};
