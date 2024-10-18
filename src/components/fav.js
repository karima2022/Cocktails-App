import { ReactComponent as StarFilled } from "./star-filled.svg";
import { ReactComponent as Star } from "./star.svg";
import { useState, useEffect } from 'react';

function FavoriteButton({ item }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('__FavList')) || [];
        setFavorites(savedFavorites);
    }, []);

    const isFavorite = favorites.some(fav => fav.strDrink === item.strDrink);

    const handleClick = () => {
        // obliger de le mettre a jour au clique la liste des fav 
        const currentFavorites = JSON.parse(localStorage.getItem('__FavList')) || [];
        
        let newFavorites;
        if (isFavorite) {
            
            newFavorites = currentFavorites.filter(fav => fav.strDrink !== item.strDrink);
        } else {
            
            newFavorites = [...currentFavorites, item];
        }

        setFavorites(newFavorites);
        localStorage.setItem('__FavList', JSON.stringify(newFavorites));
    };

    return (
        <button
            className="favorite-button"
            onClick={handleClick}
            aria-label="favorite"
        >
            {isFavorite ? <StarFilled /> : <Star />}
        </button>
    );
}

export default FavoriteButton;
