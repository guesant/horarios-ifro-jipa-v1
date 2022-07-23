import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { GeneratorFormContext } from "./GeneratorFormContext";
import { useGeneratorFormFields } from "./useGeneratorFormFields";
import { GENERATOR_FORM_COURSES } from "./utils/GENERATOR_FORM_COURSES";
import { useContextSelector } from "use-context-selector";

export const GeneratorFormCourse = () => {
  const isLoading = useContextSelector(
    GeneratorFormContext,
    ({ gradesQuery: { isLoading } }) => isLoading
  );

  const { selectedCourse, setSelectedCourse } = useGeneratorFormFields();

  return (
    <>
      <section className="my-4">
        <h1>Curso</h1>

        <>
          <ButtonGroup>
            {GENERATOR_FORM_COURSES.map((radio) => (
              <ToggleButton
                type="radio"
                key={radio.id}
                value={radio.id}
                disabled={isLoading}
                name="radio-courses"
                variant={"outline-secondary"}
                id={`radio-courses-${radio.id}`}
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
