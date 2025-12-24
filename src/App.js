import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryList from './pages/CountryList';
import CountryDetails from './pages/CountryDetails';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
import './App.css';

function App() {
    console.log('App rendering');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedMode);
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        document.body.className = darkMode ? 'dark-mode' : '';
    }, [darkMode]);

    return (
        <FavoritesProvider>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <div className="header-content">
                            <h1>Country Explorer</h1>
                            <p className="header-subtitle">Discover countries around the world</p>
                        </div>
                        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
                            {darkMode ? '☀️ Light' : '🌙 Dark'}
                        </button>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/" element={<CountryList />} />
                            <Route path="/country/:code" element={<CountryDetails />} />
                            <Route path="/favorites" element={<Favorites />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </FavoritesProvider>
    );
}

export default App;