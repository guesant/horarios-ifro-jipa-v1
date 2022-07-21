import { generateArrayOfLength } from "../../../features/utils/generateArrayOfLength";

export const generateLabels = (quantity: number, courseYearId: string) =>
  generateArrayOfLength(quantity).map((idx: number) => {
    const label = String.fromCharCode(65 + idx);

    return {
      id: `${courseYearId}-${label}`,
      name: label,
    };
  });
