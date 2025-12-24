import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import CountryCard from '../components/CountryCard';
import './Favorites.css';

const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <div className="favorites">
            <Link to="/" className="back-link">← Back to Countries</Link>
            <h1>My Favorite Countries</h1>
            {favorites.length === 0 ? (
                <p>You haven't added any favorites yet.</p>
            ) : (
                <div className="favorites-grid">
                    {favorites.map(country => (
                        <CountryCard key={country.cca3} country={country} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;