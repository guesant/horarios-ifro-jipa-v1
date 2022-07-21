import { generateYears } from "./generateYears";
import { IGeneratorFormCourse } from "./IGeneratorFormCourse";

export const GENERATOR_FORM_COURSES: IGeneratorFormCourse[] = [
  {
    id: "informatica",
    name: "Informática",
    years: generateYears(3, 2, "informatica"),
  },
  {
    id: "quimica",
    name: "Química",
    years: generateYears(3, 2, "quimica"),
  },
  {
    id: "florestas",
    name: "Florestas",
    years: generateYears(3, 1, "florestas"),
  },
];
