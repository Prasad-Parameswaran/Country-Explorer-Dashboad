import axios from 'axios';

const COUNTRIES_API_BASE = 'https://restcountries.com';
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const fetchAllCountries = async () => {
  try {
    console.log('Fetching countries from API...');
    const response = await axios.get(`${COUNTRIES_API_BASE}/v3.1/all?fields=name,flags,capital,region,population,cca3`);
    console.log('Countries fetched successfully');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const fetchCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${COUNTRIES_API_BASE}/v3.1/alpha/${code}`);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching country:', error);
    throw error;
  }
};

export const fetchWeather = async (capital) => {
  if (!WEATHER_API_KEY) {
    throw new Error('OpenWeather API key not configured');
  }
  try {
    const response = await axios.get(`${WEATHER_API_BASE}?q=${capital}&appid=${WEATHER_API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};