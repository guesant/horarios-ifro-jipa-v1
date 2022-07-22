import { FC, PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { IGeneratorFormContextFieldValues } from "./GeneratorFormContext";
import { useGeneratorFormFields } from "./useGeneratorFormFields";

const getSavedState = () =>
  JSON.parse(localStorage.getItem("generatorFormState") ?? "false");

const setSavedState = (state: any) =>
  localStorage.setItem("generatorFormState", JSON.stringify(state));

export const GeneratorFormStateStorage: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { reset } = useFormContext<IGeneratorFormContextFieldValues>();

  const { selectedYear, selectedClass, selectedCourse } =
    useGeneratorFormFields();

  const currentState = useMemo(
    () => ({
      year: selectedYear,
      class: selectedClass,
      course: selectedCourse,
    }),
    [selectedYear, selectedClass, selectedCourse]
  );

  const restoreState = useCallback(() => {
    const savedState = getSavedState();

    if (savedState) {
      reset(savedState);
    }
  }, []);

  useEffect(() => {
    restoreState();
  }, [restoreState]);

  useEffect(() => {
    setSavedState(currentState);
  }, [currentState]);

  return <>{children}</>;
};
