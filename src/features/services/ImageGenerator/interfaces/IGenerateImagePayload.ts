import { IGenerateImagePayloadElement } from "./IGenerateImagePayloadElement";

export type IGenerateImagePayload = {
  scale?: number;

  pdfLink: string;

  header: IGenerateImagePayloadElement;

  columns: IGenerateImagePayloadElement[];
};
