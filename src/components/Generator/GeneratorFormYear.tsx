import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useContextSelector } from "use-context-selector";
import { GeneratorFormContext } from "./GeneratorFormContext";
import { GeneratorFormStateStorageContext } from "./GeneratorFormStateStorage";
import { useGeneratorFormField } from "./useGeneratorFormField";
import { useGeneratorFormFieldUpdator } from "./useGeneratorFormFieldUpdator";

export const GeneratorFormYear = () => {
  const targetCourse = useContextSelector(
    GeneratorFormContext,
    ({ targetCourse }) => targetCourse
  );

  const stateWasRestored = useContextSelector(
    GeneratorFormStateStorageContext,
    ({ stateWasRestored }) => stateWasRestored
  );

  const selectedYear = useGeneratorFormField("year");
  const setSelectedYear = useGeneratorFormFieldUpdator("year");

  if (!targetCourse) {
    return (
      <>
        <section className="my-4">
          <h1>Ano</h1>
          <div>Selecione um curso.</div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="my-4">
        <h1>Ano</h1>

        <div>
          <ButtonGroup>
            {targetCourse.years.map((radio) => (
              <ToggleButton
                type="radio"
                key={radio.id}
                value={radio.id}
                name="radio-year"
                disabled={!stateWasRestored}
                id={`radio-year-${radio.id}`}
                variant={"outline-secondary"}
                checked={selectedYear === radio.id}
                onChange={(e) => setSelectedYear(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
      </section>
    </>
  );
};
