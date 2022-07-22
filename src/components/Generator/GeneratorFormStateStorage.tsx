import { FC, PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { IGeneratorFormContextFieldValues } from "./GeneratorFormContext";
import { useGeneratorFormFields } from "./useGeneratorFormFields";

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

  useEffect(() => {
    localStorage.setItem("generatorFormState", JSON.stringify(currentState));
  }, [currentState]);

  const restoreState = useCallback(() => {
    const savedState = JSON.parse(
      localStorage.getItem("generatorFormState") ?? "false"
    );

    if (savedState) {
      reset(savedState);
    }
  }, []);

  useEffect(() => {
    restoreState();
  }, [restoreState]);

  return <>{children}</>;
};
