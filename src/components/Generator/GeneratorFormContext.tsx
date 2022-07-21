import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GENERATOR_FORM_COURSES } from "./utils/GENERATOR_FORM_COURSES";
import { IGeneratorFormCourse } from "./utils/IGeneratorFormCourse";
import { IGeneratorFormCourseYear } from "./utils/IGeneratorFormCourseYear";
import { IExtractedForumTopic } from "../../features/services/GradesScrapper/interfaces/IExtractedForumTopic";
import { fetchGrades } from "../../features/services/GradesScrapper/fetchGrades";
import { useForm, FormProvider } from "react-hook-form";

export type IGeneratorFormContext = {
  grades: IExtractedForumTopic[];
  gradesQuery: UseQueryResult<IExtractedForumTopic[], unknown>;

  targetCourse: IGeneratorFormCourse | undefined;
  targetCourseYear: IGeneratorFormCourseYear | undefined;
};

export type IGeneratorFormContextFieldValues = {
  course: string | null;
  year: string | null;
  class: string | null;

  forumTopic: string | null;
};

export const GeneratorFormContext = createContext({} as IGeneratorFormContext);

export const GeneratorFormContextProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const gradesQuery = useQuery(["grades"], () => fetchGrades());

  const grades = useMemo(
    () =>
      Array.from(gradesQuery.data ?? [])
        .reverse()
        .slice(0, 3)
        .reverse(),
    [gradesQuery.data]
  );

  const methods = useForm<IGeneratorFormContextFieldValues>();

  const { watch, setValue, reset } = methods;

  const selectedCourse = watch("course");
  const selectedYear = watch("year");

  useEffect(() => {
    reset({
      course: GENERATOR_FORM_COURSES[0].id,
    });
  }, []);

  const targetCourse = useMemo(
    () => GENERATOR_FORM_COURSES.find((i) => i.id === selectedCourse),
    [selectedCourse]
  );

  const targetCourseYear = useMemo(
    () => (targetCourse?.years ?? []).find((i) => i.id === selectedYear),
    [targetCourse, selectedYear]
  );

  useEffect(() => {
    setValue("year", null);
  }, [selectedCourse]);

  useEffect(() => {
    setValue("class", null);
  }, [selectedYear]);

  useEffect(() => {
    setValue("forumTopic", grades[grades.length - 1]?.link ?? null);
  }, [grades]);

  return (
    <FormProvider {...methods}>
      <GeneratorFormContext.Provider
        value={{
          grades,
          gradesQuery,
          targetCourse,
          targetCourseYear,
        }}
      >
        {children}
      </GeneratorFormContext.Provider>
    </FormProvider>
  );
};
