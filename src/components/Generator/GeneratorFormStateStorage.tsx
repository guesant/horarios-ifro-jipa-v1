import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { IGeneratorFormContextFieldValues } from "./interfaces/IGeneratorFormContextFieldValues";
import { theLocalStorage } from "../../features/utils/theLocalStorage";
import { useGeneratorFormFields } from "./useGeneratorFormFields";

const KEY = "generatorFormState";

const getSavedState = () => JSON.parse(theLocalStorage?.getItem(KEY) ?? "null");

const setSavedState = (state: any) =>
  theLocalStorage?.setItem(KEY, JSON.stringify(state));

const useCurrentState = () => {
  const { selectedYear, selectedClass, selectedCourse } =
    useGeneratorFormFields();

  return useMemo(
    () => ({
      year: selectedYear,
      class: selectedClass,
      course: selectedCourse,
    }),
    [selectedYear, selectedClass, selectedCourse]
  );
};

export const GeneratorFormStateStorage: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [stateWasRestored, setStateWasRestored] = useState(false);

  const { reset } = useFormContext<IGeneratorFormContextFieldValues>();

  const currentState = useCurrentState();

  const restoreState = useCallback(() => {
    if (!theLocalStorage) {
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
