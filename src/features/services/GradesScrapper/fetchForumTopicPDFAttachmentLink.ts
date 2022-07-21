import { parseDocument } from "../../utils/parseDocument";
import { extractPDFAttachmentFromTopicDocument } from "./extractPDFAttachmentFromTopicDocument";

export const fetchForumTopicPDFAttachmentLink = (forumTopicURL: string) =>
  fetch(forumTopicURL)
    .then((res) => res.text())
    .then(parseDocument)
    .then(extractPDFAttachmentFromTopicDocument);
