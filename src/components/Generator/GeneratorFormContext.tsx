import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createContext } from "use-context-selector";
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

  formState: IGeneratorFormContextFieldValues;
  setFormState: Dispatch<SetStateAction<IGeneratorFormContextFieldValues>>;
};

const getLatestGrade = (grades: IExtractedForumTopic[]) =>
  grades[grades.length - 1] ?? null;

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

  const [formState, setFormState] = useState<IGeneratorFormContextFieldValues>(
    () => ({
      year: null,
      class: null,
      course: null,
      forumTopic: getLatestGrade(grades)?.link,
    })
  );

  const selectedCourse = formState.course;
  const selectedYear = formState.year;
  const selectedClass = formState.class;

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
      setFormState((state) => ({ ...state, year: null }));
    }
  }, [selectedCourse, selectedYear, targetCourseYear]);

  useEffect(() => {
    if (selectedClass && !targetCourseYearClass) {
      setFormState((state) => ({ ...state, class: null }));
    }
  }, [selectedYear, selectedClass, targetCourseYearClass]);

  const setLatestForumTopic = useCallback(() => {
    setFormState((state) => ({
      ...state,
      forumTopic: getLatestGrade(grades)?.link,
    }));
  }, [grades]);

  useEffect(() => {
    setLatestForumTopic();
  }, [setLatestForumTopic]);

  return (
    <GeneratorFormContext.Provider
      value={{
        grades,
        gradesQuery,
        targetCourse,
        targetCourseYear,
        targetCourseYearClass,

        formState,
        setFormState,
      }}
    >
      <GeneratorFormStateStorage>{children}</GeneratorFormStateStorage>
    </GeneratorFormContext.Provider>
  );
};
