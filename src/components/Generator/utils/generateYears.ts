import { generateArrayOfLength } from "../../../features/utils/generateArrayOfLength";
import { generateLabels } from "./generateLabels";

export const generateYears = (
  quantity: number,
  labelsQuantity: number,
  courseId: string
) =>
  generateArrayOfLength(quantity, 1).map((i) => {
    const courseYearId = `${courseId}-${i}`;
    return {
      name: `${i}º ano`,
      id: courseYearId,
      labels: generateLabels(labelsQuantity, courseYearId),
    };
  });
