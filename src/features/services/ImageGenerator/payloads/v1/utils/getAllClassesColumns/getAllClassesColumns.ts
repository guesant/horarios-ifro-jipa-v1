import { IAllClassesColsItem as IAllClassesColumnsItem } from "../../interfaces/IAllClassesColsItem";
import { getFirstPageCols } from "./byPages/getFirstPageCols";
import { getSecondPageCols } from "./byPages/getSecondPageCols";
import { getThirdPageCols } from "./byPages/getThirdPageCols";

export const getAllClassesColumns = (): IAllClassesColumnsItem[] => [
  ...getFirstPageCols(),
  ...getSecondPageCols(),
  ...getThirdPageCols(),
];
