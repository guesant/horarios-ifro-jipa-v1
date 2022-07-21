import { IAllClassesColsItem as IAllClassesColumnsItem } from "../../../interfaces/IAllClassesColsItem";
import { THIRD_PAGE_COLS_IDS } from "./consts/THIRD_PAGE_COLS_IDS";

const widths = [313, 312, 312];

export const getThirdPageCols = (): IAllClassesColumnsItem[] => {
  return THIRD_PAGE_COLS_IDS.map((id, idx) => ({
    id,
    element: {
      page: 3,
      top: 100 / 2338,
      height: 1426 / 2338,
      left: (327 + widths.slice(0, idx).reduce((acc, i) => i + acc, 0)) / 2338,
      width: widths[idx] / 2338,
    },
  }));
};
