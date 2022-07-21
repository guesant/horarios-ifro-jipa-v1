import { extractForumTopicsFromDocument } from "./extractForumTopicsFromDocument";

const PATTERNS_TO_INCLUDE: string[] = ["HORÁRIO", "TÉCNICO"];
const PATTERNS_TO_EXCLUDE: string[] = ["EXAME", "RECUPERAÇÃO"];

export const extractGradesFromDocument = (doc: Document) =>
  extractForumTopicsFromDocument(doc).filter(({ title }) => {
    const text = title.toUpperCase();

    return (
      PATTERNS_TO_INCLUDE.every((pattern) => text.includes(pattern)) &&
      PATTERNS_TO_EXCLUDE.every((pattern) => !text.includes(pattern))
    );
  });
