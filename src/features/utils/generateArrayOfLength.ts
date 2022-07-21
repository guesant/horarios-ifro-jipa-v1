export const generateArrayOfLength = (length: number, initialNumber = 0) =>
  Array.from({ length }).map((_, idx) => idx + initialNumber);
