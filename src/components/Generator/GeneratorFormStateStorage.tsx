import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { IGeneratorFormContextFieldValues } from "./GeneratorFormContext";
import { useGeneratorFormFields } from "./useGeneratorFormFields";

const lStorage: Storage | undefined = globalThis?.localStorage;

export const getSavedState = () =>
  JSON.parse(lStorage?.getItem("generatorFormState") ?? "false");

const setSavedState = (state: any) =>
  lStorage?.setItem("generatorFormState", JSON.stringify(state));

export const GeneratorFormStateStorage: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [stateWasRestored, setStateWasRestored] = useState(false);

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
    if (!lStorage) {
      return;
    }

    const savedState = getSavedState();

    if (savedState) {
      reset(savedState);
    }

    setStateWasRestored(true);
  }, []);

  useEffect(() => {
    if (!stateWasRestored) {
      restoreState();
    }
  }, [restoreState, stateWasRestored]);

  useEffect(() => {
    if (stateWasRestored) {
      setSavedState(currentState);
    }
  }, [stateWasRestored, currentState]);

  return <>{children}</>;
};
