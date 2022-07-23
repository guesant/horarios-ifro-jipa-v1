import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useContextSelector } from "use-context-selector";
import { GeneratorFormStateStorageContext } from "./GeneratorFormStateStorage";
import { useGeneratorFormField } from "./useGeneratorFormField";
import { useGeneratorFormFieldUpdator } from "./useGeneratorFormFieldUpdator";
import { GENERATOR_FORM_COURSES } from "./utils/GENERATOR_FORM_COURSES";

export const GeneratorFormCourse = () => {
  const stateWasRestored = useContextSelector(
    GeneratorFormStateStorageContext,
    ({ stateWasRestored }) => stateWasRestored
  );

  const selectedCourse = useGeneratorFormField("course");
  const setSelectedCourse = useGeneratorFormFieldUpdator("course");

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
                name="radio-courses"
                disabled={!stateWasRestored}
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
