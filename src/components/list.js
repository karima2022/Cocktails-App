import { useState, useEffect } from 'react';
import BasicExample from './card';

function FavoriteList() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Récupérer les favoris depuis localStorage au lieu de sessionStorage
        const savedFavorites = JSON.parse(localStorage.getItem('__FavList')) || [];
        
        if (Array.isArray(savedFavorites)) {
            setFavorites(savedFavorites.filter(fav => fav !== null));
        } else {
            setFavorites([]);
        }
    }, []);

    return (
       <div>
           <div className="title"><h2>Liste des Favoris</h2></div>
            
            <div className="cocktail-list">
            {favorites.length > 0 ? (
                favorites.map((item, index) => (
                    <div className="cocktail-card" key={index}>
                        <BasicExample
                          key={item.idDrink} 
                          img={item.strDrinkThumb}
                          title={item.strDrink}
                          categorie={item.strCategory}
                          item={item} 
                        />
                    </div>
                ))
            ) : (
                <p>Aucun favori trouvé.</p>
            )}
            </div>
        </div>
    );
}

export default FavoriteList;
