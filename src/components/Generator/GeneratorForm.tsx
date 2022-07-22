import Container from "react-bootstrap/Container";
import { GeneratorFormCourse } from "./GeneratorFormCourse";
import { GeneratorFormGrades } from "./GeneratorFormGrades";
import { GeneratorFormLabel } from "./GeneratorFormLabel";
import { GeneratorFormResult } from "./GeneratorFormResult";
import { GeneratorFormYear } from "./GeneratorFormYear";

const GeneratorForm = () => (
  <>
    <Container>
      <GeneratorFormGrades />
      <GeneratorFormCourse />
      <GeneratorFormYear />
      <GeneratorFormLabel />
      <GeneratorFormResult />
    </Container>
  </>
);

export default GeneratorForm;
