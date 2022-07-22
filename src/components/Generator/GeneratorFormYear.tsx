import { useContext } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { GeneratorFormContext } from "./GeneratorFormContext";
import { useGeneratorFormFields } from "./useGeneratorFormFields";

export const GeneratorFormYear = () => {
  const {
    targetCourse,
    gradesQuery: { isLoading },
  } = useContext(GeneratorFormContext);

  const { selectedYear, setSelectedYear } = useGeneratorFormFields();

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
                disabled={isLoading}
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
