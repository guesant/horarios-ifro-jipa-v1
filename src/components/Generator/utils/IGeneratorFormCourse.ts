import { IGeneratorFormCourseYear } from "./IGeneratorFormCourseYear";

export type IGeneratorFormCourse = {
  id: string;
  name: string;
  years: IGeneratorFormCourseYear[];
};
