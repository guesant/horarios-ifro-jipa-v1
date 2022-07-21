import { useFormContext } from "react-hook-form";
import { IGeneratorFormContextFieldValues } from "./GeneratorFormContext";

export const useGeneratorFormFields = () => {
  const { watch, setValue } =
    useFormContext<IGeneratorFormContextFieldValues>();

  const selectedCourse = watch("course");
  const selectedYear = watch("year");
  const selectedClass = watch("class");
  const selectedForumTopic = watch("forumTopic");

  const setSelectedCourse = (value: string | null) => setValue("course", value);
  const setSelectedYear = (value: string | null) => setValue("year", value);
  const setSelectedClass = (value: string | null) => setValue("class", value);
  const setSelectedForumTopic = (value: string | null) =>
    setValue("forumTopic", value);

  return {
    selectedCourse,
    selectedYear,
    selectedClass,
    selectedForumTopic,
    setSelectedCourse,
    setSelectedYear,
    setSelectedClass,
    setSelectedForumTopic,
  };
};
