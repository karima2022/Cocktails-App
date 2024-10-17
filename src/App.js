import './App.css';
import ColorSchemesExample from './components/navbar';
import BasicExample from './components/card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

function App() {
  const [cocktailsData, setCocktailsData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAlcoholicCoktails() {
    setLoading(true); 
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`;

    console.log('Fetching Alcoholic cocktails...');

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const cocktailsWithCategory = data.drinks.map(cocktail => ({
          ...cocktail,
          strCategory: 'Alcoholic'
        }));
        return cocktailsWithCategory;
      } else {
        const errorText = await response.text();
        console.error('Error fetching cocktails data:', response.status, errorText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false); 
    }
  }

  async function fetchNonAlcoholicCoktails() {
    setLoading(true); 
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`;

    console.log('Fetching Non Alcoholic cocktails...');

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const cocktailsWithCategory = data.drinks.map(cocktail => ({
          ...cocktail,
          strCategory: 'Non Alcoholic'
        }));
        return cocktailsWithCategory;
      } else {
        const errorText = await response.text();
        console.error('Error fetching cocktails data:', response.status, errorText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false); 
    }
  }

  // Fonction pour mélanger un tableau
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      const alcoholicCocktails = await fetchAlcoholicCoktails();
      const nonAlcoholicCocktails = await fetchNonAlcoholicCoktails();

      // Combiner les deux listes
      const combinedCocktails = [...alcoholicCocktails, ...nonAlcoholicCocktails];

      // Mélanger les cocktails
      shuffleArray(combinedCocktails);

      // Mettre à jour l'état avec la liste mélangée
      setCocktailsData(combinedCocktails);
      console.log(combinedCocktails)
      setLoading(false);
    };

    fetchCocktails();
  }, []);

  return (
    <div className="App">
      <ColorSchemesExample />

      {loading ? (
        <Spinner className="spinner" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div className="cocktail-list">
          {cocktailsData.map((cocktail, index) => (
            <div className="cocktail-card" key={index}>
              <BasicExample
                title={cocktail.strDrink}
                categorie={cocktail.strCategory || ''}
                img={cocktail.strDrinkThumb}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
