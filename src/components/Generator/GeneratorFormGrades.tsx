import { useContextSelector } from "use-context-selector";
import Form from "react-bootstrap/Form";
import { GeneratorFormContext } from "./GeneratorFormContext";
import {
  useGeneratorFormField,
  useGeneratorFormFieldUpdator,
} from "./useGeneratorFormFields";

export const GeneratorFormGrades = () => {
  const grades = useContextSelector(
    GeneratorFormContext,
    ({ grades }) => grades
  );

  const isLoading = useContextSelector(
    GeneratorFormContext,
    ({ gradesQuery: { isLoading } }) => isLoading
  );

  const selectedForumTopic = useGeneratorFormField("forumTopic");
  const setSelectedForumTopic = useGeneratorFormFieldUpdator("forumTopic");

  return (
    <>
      <section className="my-4">
        <h1>Grade</h1>

        <Form.Select
          value={selectedForumTopic ?? ""}
          onChange={(e) => setSelectedForumTopic(e.target.value)}
        >
          <option disabled value={""}>
            {isLoading
              ? "Carregando as grades de horários..."
              : "Selecione uma opção"}
          </option>

          {grades.map(({ link, title }, idx, arr) => (
            <option key={link} value={link}>
              {title} {idx === arr.length - 1 && <>[mais recente]</>}
            </option>
          ))}
        </Form.Select>
      </section>
    </>
  );
};
