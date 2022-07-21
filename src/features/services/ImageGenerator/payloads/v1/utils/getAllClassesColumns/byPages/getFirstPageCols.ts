import { IAllClassesColsItem as IAllClassesColumnsItem } from "../../../interfaces/IAllClassesColsItem";
import { FIRST_PAGE_COLS_IDS } from "./consts/FIRST_PAGE_COLS_IDS";

const widths = [313, 313, 313, 313, 313, 313];

export const getFirstPageCols = (): IAllClassesColumnsItem[] => {
  return FIRST_PAGE_COLS_IDS.map((id, idx) => ({
    id,
    element: {
      page: 1,
      top: 100 / 2338,
      height: 1426 / 2338,
      width: widths[idx] / 2338,
      left: (321 + widths.slice(0, idx).reduce((acc, i) => i + acc, 0)) / 2338,
    },
  }));
};
