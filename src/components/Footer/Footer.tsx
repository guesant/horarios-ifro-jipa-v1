import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const Footer = () => {
  return (
    <>
      <footer>
        <Card body>
          <Container>
            <a
              className="text-decoration-none"
              href="https://linktr.ee/gabriel.rodrigues.antunes"
            >
              Gabriel R. Antunes
            </a>{" "}
            (c) 2022.
          </Container>
        </Card>
      </footer>
    </>
  );
};

export default Footer;
