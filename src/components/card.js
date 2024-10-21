import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FavoriteButton from './fav';
import { useNavigate } from 'react-router-dom';

function BasicExample({ img, title, categorie, item }) {
  const navigate = useNavigate();
  const handleViewClick = () => {
    
    navigate(`/recette/${item.idDrink}`);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{categorie}</Card.Text>
        <Button variant="primary" onClick={handleViewClick}>  Voir
        </Button>
        <FavoriteButton item={item} />
      </Card.Body>
    </Card>
  );
}

export default BasicExample;
