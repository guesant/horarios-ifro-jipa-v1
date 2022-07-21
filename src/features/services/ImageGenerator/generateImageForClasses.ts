import { generateImage } from "./generateImage";
import { IGenerateImagePayload } from "./interfaces/IGenerateImagePayload";
import { ALL_HEADERS } from "./payloads/v1";
import { getClassColumn } from "./payloads/v1/utils/getClassColumn";

export const generateImageForClasses = (
  payload: Omit<IGenerateImagePayload, "header" | "columns">,
  classes: string[]
) =>
  generateImage({
    ...payload,
    header: ALL_HEADERS[0].element,
    columns: classes.map((id) => getClassColumn(id).element),
  });
