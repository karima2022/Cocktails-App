import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.drinks[0]);
    };

    fetchRecipe();
  }, [id]);

  const getIngredients = (recipe) => {
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({
          name: ingredient,
          measure: measure || "",
        });
      }
    }
    return ingredients;
  };

  if (!recipe) return <p>Erreur dans le chargement de la recette ...</p>;

  const ingredients = getIngredients(recipe);

  return (
    <div className="recipe-detail-container">
      <h1>{recipe.strDrink}</h1>
      <img src={recipe.strDrinkThumb} alt={recipe.strDrink} />
      
      <div className="recipe-info">
        <div>
          <strong>Catégorie:</strong> {recipe.strCategory}
        </div>
        <div>
          <strong>Alcool:</strong> {recipe.strAlcoholic}
        </div>
        <div>
          <strong>Type de verre:</strong> {recipe.strGlass}
        </div>
      </div>
      
      <div className="ingredients-section">
        <h2>Ingrédients</h2>
        <div className="ingredients-list">
          {ingredients.map((ingredient, index) => (
            <div className="ingredient" key={index}>
              <img
                src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.name}-Medium.png`}
                alt={ingredient.name}
              />
              <p>{ingredient.name} - {ingredient.measure}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="recipe-instructions">
        <strong>Instructions:</strong>
        <p>{recipe.strInstructions}</p>
      </div>


      <Link to="/" className="back-button">Retour</Link>
    </div>
  );
}

export default RecipeDetail;
