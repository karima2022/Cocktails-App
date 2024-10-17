import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  return (
    <>
    
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">  
          <img
  src="/img/cocktail_3086535.png"
  alt="Logo"
  width="30"
  height="30"
  className="d-inline-block align-top logo"
/>

      Cocktail-App</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Favoris</Nav.Link>
            <Nav.Link href="#pricing">Recherche</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;