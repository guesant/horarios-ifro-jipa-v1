import { useContext } from "react";
import Form from "react-bootstrap/Form";
import { GeneratorFormContext } from "./GeneratorFormContext";
import { useGeneratorFormFields } from "./useGeneratorFormFields";

export const GeneratorFormGrades = () => {
  const {
    grades,
    gradesQuery: { isLoading },
  } = useContext(GeneratorFormContext);

  const { selectedForumTopic, setSelectedForumTopic } =
    useGeneratorFormFields();

  return (
    <>
      <section className="my-4">
        <h1>Grade</h1>

        <Form.Select
          value={selectedForumTopic ?? ""}
          onChange={(e) => setSelectedForumTopic(e.target.value)}
        >
          <option disabled value="">
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
