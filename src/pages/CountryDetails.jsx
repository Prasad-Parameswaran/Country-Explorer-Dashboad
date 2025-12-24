import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCountryByCode, fetchWeather } from '../services/api';
import './CountryDetails.css';

const CountryDetails = () => {
    const { code } = useParams();
    const [country, setCountry] = useState(null);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const mockCountries = {
        USA: {
            name: { common: 'United States', official: 'United States of America' },
            capital: ['Washington, D.C.'],
            region: 'Americas',
            subregion: 'Northern America',
            population: 331900000,
            languages: { eng: 'English' },
            currencies: { USD: { name: 'United States dollar', symbol: '$' } },
            timezones: ['UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC+10:00', 'UTC+12:00'],
            flags: { png: 'https://flagcdn.com/w320/us.png' },
            cca3: 'USA'
        },
        CAN: {
            name: { common: 'Canada', official: 'Canada' },
            capital: ['Ottawa'],
            region: 'Americas',
            subregion: 'Northern America',
            population: 38000000,
            languages: { eng: 'English', fra: 'French' },
            currencies: { CAD: { name: 'Canadian dollar', symbol: '$' } },
            timezones: ['UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:30'],
            flags: { png: 'https://flagcdn.com/w320/ca.png' },
            cca3: 'CAN'
        },
        DEU: {
            name: { common: 'Germany', official: 'Federal Republic of Germany' },
            capital: ['Berlin'],
            region: 'Europe',
            subregion: 'Western Europe',
            population: 83000000,
            languages: { deu: 'German' },
            currencies: { EUR: { name: 'Euro', symbol: '€' } },
            timezones: ['UTC+01:00'],
            flags: { png: 'https://flagcdn.com/w320/de.png' },
            cca3: 'DEU'
        }
    };

    useEffect(() => {
        const loadCountry = async () => {
            try {
                const data = await fetchCountryByCode(code);
                setCountry(data);

                if (data.capital && data.capital[0]) {
                    try {
                        const weatherData = await fetchWeather(data.capital[0]);
                        setWeather(weatherData);
                    } catch (weatherError) {
                        console.error('Weather fetch failed:', weatherError);
                    }
                }
            } catch (err) {
                console.error('Error loading country:', err);
                // Fallback to mock data
                if (mockCountries[code]) {
                    setCountry(mockCountries[code]);
                    setError(null);
                } else {
                    setError('Failed to load country details');
                }
            } finally {
                setLoading(false);
            }
        };
        loadCountry();
    }, [code]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!country) return <div>Country not found</div>;

    return (
        <div className="country-details">
            <Link to="/" className="back-link">← Back to Countries</Link>
            <div className="country-header">
                <img src={country.flags.png} alt={`${country.name.common} flag`} className="large-flag" />
                <h1>{country.name.common}</h1>
            </div>
            <div className="details-grid">
                <div className="detail-item">
                    <strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}
                </div>
                <div className="detail-item">
                    <strong>Region:</strong> {country.region}
                </div>
                <div className="detail-item">
                    <strong>Sub-region:</strong> {country.subregion || 'N/A'}
                </div>
                <div className="detail-item">
                    <strong>Population:</strong> {country.population.toLocaleString()}
                </div>
                <div className="detail-item">
                    <strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
                </div>
                <div className="detail-item">
                    <strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(curr => curr.name).join(', ') : 'N/A'}
                </div>
                <div className="detail-item">
                    <strong>Time Zones:</strong> {country.timezones ? country.timezones.join(', ') : 'N/A'}
                </div>
            </div>
            {weather && (
                <div className="weather-section">
                    <h2>Weather in {country.capital[0]}</h2>
                    <div className="weather-info">
                        <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
                        <p><strong>Condition:</strong> {weather.weather[0].description}</p>
                        <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                        <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CountryDetails;
