import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { fetchGrades } from "../../features/services/GradesScrapper/fetchGrades";
import { IExtractedForumTopic } from "../../features/services/GradesScrapper/interfaces/IExtractedForumTopic";
import { GeneratorFormStateStorage } from "./GeneratorFormStateStorage";
import { IGeneratorFormContextFieldValues } from "./interfaces/IGeneratorFormContextFieldValues";
import { GENERATOR_FORM_COURSES } from "./utils/GENERATOR_FORM_COURSES";
import { IGeneratorFormCourse } from "./utils/IGeneratorFormCourse";
import { IGeneratorFormCourseYear } from "./utils/IGeneratorFormCourseYear";
import { IGeneratorFormCourseYearLabel } from "./utils/IGeneratorFormCourseYearLabel";

export type IGeneratorFormContext = {
  grades: IExtractedForumTopic[];
  gradesQuery: UseQueryResult<IExtractedForumTopic[], unknown>;

  targetCourse: IGeneratorFormCourse | undefined;
  targetCourseYear: IGeneratorFormCourseYear | undefined;
  targetCourseYearClass: IGeneratorFormCourseYearLabel | undefined;
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

  const { watch, setValue } = methods;

  const selectedCourse = watch("course");
  const selectedYear = watch("year");
  const selectedClass = watch("class");

  const targetCourse = useMemo(
    () => GENERATOR_FORM_COURSES.find((i) => i.id === selectedCourse),
    [selectedCourse]
  );

  const targetCourseYear = useMemo(
    () => (targetCourse?.years ?? []).find((i) => i.id === selectedYear),
    [targetCourse, selectedYear]
  );

  const targetCourseYearClass = useMemo(
    () => (targetCourseYear?.labels ?? []).find((i) => i.id === selectedClass),
    [targetCourseYear, selectedClass]
  );

  useEffect(() => {
    if (!targetCourseYear && selectedYear) {
      setValue("year", null);
    }
  }, [selectedCourse, selectedYear, targetCourseYear]);

  useEffect(() => {
    if (selectedClass && !targetCourseYearClass) {
      setValue("class", null);
    }
  }, [selectedYear, selectedClass, targetCourseYearClass]);

  useEffect(() => {
    setValue("forumTopic", grades[grades.length - 1]?.link ?? null);
  }, [grades]);

  return (
    <FormProvider {...methods}>
      <GeneratorFormStateStorage>
        <GeneratorFormContext.Provider
          value={{
            grades,
            gradesQuery,
            targetCourse,
            targetCourseYear,
            targetCourseYearClass,
          }}
        >
          {children}
        </GeneratorFormContext.Provider>
      </GeneratorFormStateStorage>
    </FormProvider>
  );
};
