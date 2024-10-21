import './App.css';
import ColorSchemesExample from './components/navbar';
import BasicExample from './components/card';
import FavoriteList from './components/list'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeDetail from './components/details'; 

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
      const combinedCocktails = [...alcoholicCocktails, ...nonAlcoholicCocktails];
      shuffleArray(combinedCocktails);
      setCocktailsData(combinedCocktails);
      console.log(combinedCocktails)
    
      setLoading(false);
    };

    fetchCocktails();
  }, []);

  return (
    <Router>
      <div className="App">
        <ColorSchemesExample />

        {loading ? (
          <Spinner className="spinner" animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="cocktail-list">
                  {cocktailsData.map((cocktail, index) => (
                    <div className="cocktail-card" key={index}>
                      <BasicExample
                        title={cocktail.strDrink}
                        categorie={cocktail.strCategory || ''}
                        img={cocktail.strDrinkThumb}
                        item={cocktail}
                      />
                    </div>
                  ))}
                </div>
              } 
            />
            <Route path="/favoris" element={<FavoriteList />} />
            <Route path="/recette/:id" element={<RecipeDetail />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;