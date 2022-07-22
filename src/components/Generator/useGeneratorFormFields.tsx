import { useFormContext } from "react-hook-form";
import { IGeneratorFormContextFieldValues } from "./interfaces/IGeneratorFormContextFieldValues";

export const useGeneratorFormFields = () => {
  const { watch, setValue } =
    useFormContext<IGeneratorFormContextFieldValues>();

  const selectedCourse = watch("course");
  const setSelectedCourse = (value: string | null) => setValue("course", value);

  const selectedYear = watch("year");
  const setSelectedYear = (value: string | null) => setValue("year", value);

  const selectedClass = watch("class");
  const setSelectedClass = (value: string | null) => setValue("class", value);

  const selectedForumTopic = watch("forumTopic");
  const setSelectedForumTopic = (value: string | null) =>
    setValue("forumTopic", value);

  return {
    selectedCourse,
    setSelectedCourse,
    selectedYear,
    setSelectedYear,
    selectedClass,
    setSelectedClass,
    selectedForumTopic,
    setSelectedForumTopic,
  };
};
