import { useCallback } from "react";
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
