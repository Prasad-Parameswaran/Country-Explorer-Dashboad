# 🌍 Country Explorer Dashboard

A modern, responsive React application that allows users to explore country data, weather information, and manage favorites with a beautiful, user-friendly interface.

## ✨ Features

### Core Features

- **🌎 Country Listing**: Fetch and display all countries from REST Countries API with pagination
- **🔍 Search & Filter**: Real-time search by country name, filter by region and population range
- **📋 Country Details**: Detailed view with flag, capital, region, population, languages, currencies, time zones
- **🌤️ Weather Integration**: Current weather for country's capital using OpenWeatherMap API
- **❤️ Favorites System**: Mark/unmark countries as favorites with LocalStorage persistence
- **🎨 Dark/Light Mode**: Toggle between themes with smooth transitions
- **📱 Responsive Design**: Optimized for mobile and desktop devices

### Advanced Features

- **Sticky Header**: Navigation stays visible while scrolling
- **Modern UI**: Clean design with gradients, shadows, and animations
- **No Results Handling**: Helpful messages when searches return empty
- **Loading States**: Smooth loading indicators and error handling
- **Context API**: Efficient state management for favorites

## 🚀 APIs Used

- [REST Countries API](https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,cca3) - Free
- [OpenWeatherMap API](https://openweathermap.org/api) - Free tier (requires API key)

## 🛠️ Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd country-explorer-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Add your API key to `.env`:
     ```
     REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
     ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── CountryCard.jsx/css
│   ├── SearchBar.jsx/css
│   ├── Filters.jsx/css
│   └── ErrorBoundary.jsx
├── pages/
│   ├── CountryList.jsx/css
│   ├── CountryDetails.jsx/css
│   └── Favorites.jsx/css
├── services/
│   └── api.js
├── context/
│   └── FavoritesContext.jsx
├── App.jsx/css
├── index.js/css
└── index.css
```

## 🛡️ Security

- API keys stored securely in environment variables
- `.env` file excluded from version control via `.gitignore`
- Sensitive data never committed to repository

## 🎯 Technologies Used

- **React** (functional components, hooks, Context API)
- **React Router** (client-side routing)
- **Axios** (HTTP client for API calls)
- **CSS3** (modern styling with responsive design)
- **LocalStorage** (client-side data persistence)
- **REST APIs** (external data integration)

## Project Structure

```
src/
├── components/
│   ├── CountryCard.jsx
│   ├── SearchBar.jsx
│   ├── Filters.jsx
├── pages/
│   ├── CountryList.jsx
│   ├── CountryDetails.jsx
│   ├── Favorites.jsx
├── services/
│   ├── api.js
├── context/
│   ├── FavoritesContext.jsx
├── App.jsx
└── index.js
```

## Technologies Used

- React (functional components, hooks)
- React Router
- Axios for API calls
- CSS for styling
- LocalStorage for persistence
