import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useGeneratorFormFields } from "./useGeneratorFormFields";
import { GENERATOR_FORM_COURSES } from "./utils/GENERATOR_FORM_COURSES";

export const GeneratorFormCourse = () => {
  const { selectedCourse, setSelectedCourse } = useGeneratorFormFields();

  return (
    <>
      <section className="my-4">
        <h1>Curso</h1>

        <>
          <ButtonGroup>
            {GENERATOR_FORM_COURSES.map((radio) => (
              <ToggleButton
                key={radio.id}
                type="radio"
                name="radio"
                value={radio.id}
                id={`radio-${radio.id}`}
                variant={"outline-secondary"}
                checked={selectedCourse === radio.id}
                onChange={(e) => setSelectedCourse(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </>
      </section>
    </>
  );
};
