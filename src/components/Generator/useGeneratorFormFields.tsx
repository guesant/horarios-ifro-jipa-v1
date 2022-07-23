import { useCallback, useMemo } from "react";
import { useContextSelector } from "use-context-selector";
import { GeneratorFormContext } from "./GeneratorFormContext";
import { IGeneratorFormContextFieldValues } from "./interfaces/IGeneratorFormContextFieldValues";

export const useGeneratorFormFieldUpdator = (
  field: keyof IGeneratorFormContextFieldValues
) => {
  const setFormState = useContextSelector(
    GeneratorFormContext,
    ({ setFormState }) => setFormState
  );

  return useCallback(
    (value: string | null) => {
      setFormState((state) => ({ ...state, [field]: value }));
    },
    [field, setFormState]
  );
};

export const useGeneratorFormField = (
  field: keyof IGeneratorFormContextFieldValues
) => {
  const formState = useContextSelector(
    GeneratorFormContext,
    ({ formState }) => formState
  );

  return useMemo(() => formState?.[field], [formState, field]);
};

export const useGeneratorFormFields = () => {
  const selectedCourse = useGeneratorFormField("course");
  const setSelectedCourse = useGeneratorFormFieldUpdator("course");

  const selectedYear = useGeneratorFormField("year");
  const setSelectedYear = useGeneratorFormFieldUpdator("year");

  const selectedClass = useGeneratorFormField("class");
  const setSelectedClass = useGeneratorFormFieldUpdator("class");

  const selectedForumTopic = useGeneratorFormField("forumTopic");
  const setSelectedForumTopic = useGeneratorFormFieldUpdator("forumTopic");

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
