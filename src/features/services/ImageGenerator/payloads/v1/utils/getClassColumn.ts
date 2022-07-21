import { ALL_CLASSES_COLUMNS } from "../ALL_CLASSES_COLUMNS";

export const getClassColumn = (id: string) =>
  ALL_CLASSES_COLUMNS.find((i) => i.id === id)!;
