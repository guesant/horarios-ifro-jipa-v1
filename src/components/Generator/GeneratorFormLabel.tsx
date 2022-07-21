import { useMemo } from "react";
import Alert from "react-bootstrap/Alert";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useGeneratorFormFields } from "./useGeneratorFormFields";
import { GENERATOR_FORM_COURSES } from "./utils/GENERATOR_FORM_COURSES";

export const GeneratorFormLabel = () => {
  const { selectedCourse, selectedYear, selectedClass, setSelectedClass } =
    useGeneratorFormFields();

  const course = useMemo(
    () => GENERATOR_FORM_COURSES.find((i) => i.id === selectedCourse),
    [selectedCourse]
  );

  const year = useMemo(
    () => (course?.years ?? []).find((i) => i.id === selectedYear),
    [course, selectedYear]
  );

  if (!year) {
    return (
      <>
        <section className="my-4">
          <h1>Turma</h1>

          <Alert variant="warning">
            <>Selecione um {selectedCourse ? "" : "curso e um"} ano.</>
          </Alert>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="my-4">
        <h1>Turma</h1>

        <div>
          <ButtonGroup>
            {year.labels?.map((radio) => (
              <ToggleButton
                type="radio"
                key={radio.id}
                value={radio.id}
                name="radio-label"
                variant={"outline-secondary"}
                id={`radio-label-${radio.id}`}
                checked={selectedClass === radio.id}
                onChange={(e) => setSelectedClass(e.currentTarget.value)}
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
