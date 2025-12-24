import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { fetchAllCountries } from '../services/api';
import './CountryList.css';

const CountryList = () => {
    console.log('CountryList rendering');
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [regionFilter, setRegionFilter] = useState('all');
    const [populationFilter, setPopulationFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const data = await fetchAllCountries();
                setCountries(data);
                setFilteredCountries(data);
            } catch (err) {
                console.error('Error loading countries:', err);
                // Fallback to mock data for demo
                const mockCountries = [
                    {
                        name: { common: 'United States', official: 'United States of America' },
                        capital: ['Washington, D.C.'],
                        region: 'Americas',
                        population: 331900000,
                        flags: { png: 'https://flagcdn.com/w320/us.png' },
                        cca3: 'USA'
                    },
                    {
                        name: { common: 'Canada', official: 'Canada' },
                        capital: ['Ottawa'],
                        region: 'Americas',
                        population: 38000000,
                        flags: { png: 'https://flagcdn.com/w320/ca.png' },
                        cca3: 'CAN'
                    },
                    {
                        name: { common: 'Germany', official: 'Federal Republic of Germany' },
                        capital: ['Berlin'],
                        region: 'Europe',
                        population: 83000000,
                        flags: { png: 'https://flagcdn.com/w320/de.png' },
                        cca3: 'DEU'
                    }
                ];
                setCountries(mockCountries);
                setFilteredCountries(mockCountries);
                setError(null); // Clear error since we have fallback
            } finally {
                setLoading(false);
            }
        };
        loadCountries();
    }, []);

    useEffect(() => {
        let filtered = countries;

        if (searchTerm) {
            filtered = filtered.filter(country =>
                country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (regionFilter !== 'all') {
            filtered = filtered.filter(country =>
                country.region.toLowerCase() === regionFilter
            );
        }

        if (populationFilter !== 'all') {
            filtered = filtered.filter(country => {
                const pop = country.population;
                if (populationFilter === 'small') return pop < 10000000;
                if (populationFilter === 'medium') return pop >= 10000000 && pop <= 50000000;
                if (populationFilter === 'large') return pop > 50000000;
                return true;
            });
        }

        setFilteredCountries(filtered);
        setCurrentPage(1);
    }, [countries, searchTerm, regionFilter, populationFilter]);

    const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCountries = filteredCountries.slice(startIndex, startIndex + itemsPerPage);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="country-list">
            <div className="controls">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Filters
                    regionFilter={regionFilter}
                    setRegionFilter={setRegionFilter}
                    populationFilter={populationFilter}
                    setPopulationFilter={setPopulationFilter}
                />
                <Link to="/favorites" className="favorites-link">View Favorites</Link>
            </div>
            <div className="countries-grid">
                {paginatedCountries.map(country => (
                    <CountryCard key={country.cca3} country={country} />
                ))}
            </div>
            {filteredCountries.length === 0 && (
                <div className="no-results">
                    <h2>No countries found</h2>
                    <p>Try adjusting your search or filters</p>
                </div>
            )}
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CountryList;