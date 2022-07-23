import { useMemo } from "react";
import { useContextSelector } from "use-context-selector";
import { GeneratorFormContext } from "./GeneratorFormContext";
import { IGeneratorFormContextFieldValues } from "./interfaces/IGeneratorFormContextFieldValues";

export const useGeneratorFormField = (
  field: keyof IGeneratorFormContextFieldValues
) => {
  const formState = useContextSelector(
    GeneratorFormContext,
    ({ formState }) => formState
  );

  return useMemo(() => formState?.[field], [formState, field]);
};
