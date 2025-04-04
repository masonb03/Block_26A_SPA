import { useState } from 'react';
import './App.css';
import SelectedWeather from './components/SelectedWeather';
import WeatherList from './components/WeatherList';

function App() {
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [showForecast, setShowForecast] = useState(false);

  return (
    <div className="app-container">
      <h1>What's Your Weather?</h1>

      
      <input
        type="text"
        placeholder="Enter city"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={() => {
        setSelectedWeather(location);
        setShowForecast(false);
      }}>
        Get Current Weather
      </button>

      <button onClick={() => {
        setSelectedWeather(location);
        setShowForecast(true);
      }}>
        Get Hourly Forecast
      </button>

    
      {selectedWeather && !showForecast && (
        <SelectedWeather
          location={selectedWeather}
          setSelectedWeather={setSelectedWeather}
        />
      )}

      {selectedWeather && showForecast && (
        <WeatherList
          location={selectedWeather}
          setSelectedWeather={setSelectedWeather}
        />
      )}
    </div>
  );
}

export default App;
