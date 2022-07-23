import { querySelector } from "../../../utils/DOM/querySelector";
import { querySelectorAll } from "../../../utils/DOM/querySelectorAll";
import { IExtractedForumTopic } from "../interfaces/IExtractedForumTopic";

const getInfoFromDiscussionListItem = async (
  itemElement: HTMLTableRowElement
): Promise<IExtractedForumTopic> => {
  const anchorElement = await querySelector<HTMLAnchorElement>(
    "th:nth-child(2) > div:nth-child(1) > a:nth-child(1)",
    itemElement
  )!;

  const timeCreatedElement = await querySelector<HTMLTimeElement>(
    'time[id^="time-created"]',
    itemElement
  )!;

  const link = anchorElement.getAttribute("href")!;

  const title = anchorElement.textContent!.trim();

  const publishedAt = parseInt(
    timeCreatedElement.getAttribute("data-timestamp")!
  );

  return {
    link,
    title,
    publishedAt,
  };
};

export const extractForumTopicsFromDocument = async (
  doc: Document
): Promise<IExtractedForumTopic[]> => {
  const discussions = Array.from(
    await querySelectorAll<HTMLTableRowElement>(
      '[data-region="discussion-list-item"]',
      doc
    )
  );

  const discussionsInfos = await Promise.all(
    discussions.map(getInfoFromDiscussionListItem)
  );

  return discussionsInfos.sort((a, b) => a.publishedAt - b.publishedAt);
};
