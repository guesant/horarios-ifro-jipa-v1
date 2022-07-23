import { parseDocument } from "../../utils/DOM/parseDocument";
import { extractPDFAttachmentFromTopicDocument } from "./extractPDFAttachmentFromTopicDocument";

export const fetchForumTopicPDFAttachmentLink = (forumTopicURL: string) =>
  fetch(forumTopicURL)
    .then((res) => res.text())
    .then(parseDocument)
    .then(extractPDFAttachmentFromTopicDocument);
