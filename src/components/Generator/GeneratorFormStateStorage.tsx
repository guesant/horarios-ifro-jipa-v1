import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useContextSelector } from "use-context-selector";
import { theLocalStorage } from "../../features/utils/theLocalStorage";
import { GeneratorFormContext } from "./GeneratorFormContext";
import { useGeneratorFormField } from "./useGeneratorFormFields";

const KEY = "generatorFormState";

const getSavedState = () => JSON.parse(theLocalStorage?.getItem(KEY) ?? "null");

const setSavedState = (state: any) =>
  theLocalStorage?.setItem(KEY, JSON.stringify(state));

const useGeneratorFormCurrentState = () => {
  const selectedCourse = useGeneratorFormField("course");
  const selectedYear = useGeneratorFormField("year");
  const selectedClass = useGeneratorFormField("class");

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

  const setFormState = useContextSelector(
    GeneratorFormContext,
    ({ setFormState }) => setFormState
  );

  const currentState = useGeneratorFormCurrentState();

  const restoreState = useCallback(() => {
    if (!theLocalStorage) {
      return;
    }

    const savedState = getSavedState();

    if (savedState) {
      setFormState((state) => ({ ...state, ...savedState }));
    }

    setStateWasRestored(true);
  }, [setFormState]);

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
