import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import './CountryCard.css';

const CountryCard = ({ country }) => {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const handleFavoriteToggle = (e) => {
        e.preventDefault();
        if (isFavorite(country.cca3)) {
            removeFavorite(country.cca3);
        } else {
            addFavorite(country);
        }
    };

    return (
        <div className="country-card">
            <Link to={`/country/${country.cca3}`}>
                <img src={country.flags.png} alt={`${country.name.common} flag`} className="country-flag" />
                <h3>{country.name.common}</h3>
                <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            </Link>
            <button onClick={handleFavoriteToggle} className="favorite-btn">
                {isFavorite(country.cca3) ? '❤️' : '🤍'}
            </button>
        </div>
    );
};

export default CountryCard;
