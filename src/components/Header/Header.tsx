import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export type IHeaderProps = {
  title?: string;
};

const Header = (props: IHeaderProps) => {
  const { title } = props;

  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              {title ?? "Horários IFRO Ji-Paraná"}
            </Navbar.Brand>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
