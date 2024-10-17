import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample({img, title, categorie}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {categorie}
        </Card.Text>
        <Button variant="primary">Voir</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;