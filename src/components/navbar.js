import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function ColorSchemesExample() {
  return (
    <Navbar bg="light" data-bs-theme="light" className="py-3"> {/* Ajout de py-3 pour la hauteur */}
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/img/cocktail_3086535.png"
            alt="Logo"
            width="60"  // Taille du logo agrandie
            height="60"  // Taille du logo agrandie
            className="d-inline-block align-top logo"
          />
          <span className="ms-2 fs-4">Cocktail-App</span>  {/* Taille du texte augmentée avec fs-4 */}
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" className="fs-5">Home</Nav.Link> {/* Augmente la taille des liens */}
          <Nav.Link as={Link} to="/favoris" className="fs-5">Favoris</Nav.Link>
          <Nav.Link href="#pricing" className="fs-5">Recherche</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;
