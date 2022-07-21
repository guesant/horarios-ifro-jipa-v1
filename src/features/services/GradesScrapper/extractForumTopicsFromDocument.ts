import { IExtractedForumTopic } from "./interfaces/IExtractedForumTopic";

export const extractForumTopicsFromDocument = (
  doc: Document
): IExtractedForumTopic[] =>
  Array.from(
    doc.querySelectorAll<HTMLTableRowElement>(
      '[data-region="discussion-list-item"]'
    )
  )
    .map((itemElement) => {
      const anchorElement = itemElement.querySelector<HTMLAnchorElement>(
        "th:nth-child(2) > div:nth-child(1) > a:nth-child(1)"
      )!;

      const timeCreatedElement = itemElement.querySelector<HTMLTimeElement>(
        'time[id^="time-created"]'
      )!;

      const link = anchorElement.href;
      const title = anchorElement.innerText.trim();
      const publishedAt = parseInt(timeCreatedElement.dataset.timestamp!);

      return {
        link,
        title,
        publishedAt,
      };
    })
    .sort((a, b) => a.publishedAt - b.publishedAt);
