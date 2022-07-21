import { generateArrayOfLength } from "../../../../../utils/generateArrayOfLength";
import { IAllHeadersItem } from "../interfaces/IAllHeadersItem";

export const getAllHeaders = (): IAllHeadersItem[] =>
  generateArrayOfLength(1, 1).map((i) => ({
    element: {
      page: i,
      left: 55 / 2338,
      top: 100 / 2338,
      width: 265 / 2338,
      height: 1426 / 2338,
    },
  }));
