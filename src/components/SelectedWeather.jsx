import { useState, useEffect } from 'react';

export default function SelectedWeather({ location, setSelectedWeather }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError(null);

      try {
        
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
        const geoData = await geoRes.json();

        if (geoData.length === 0) {
          setError("Location not found. Please enter a valid city.");
          setLoading(false);
          return;
        }

        const { lat, lon } = geoData[0];

        
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,rain&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`
        );
        const weatherData = await weatherRes.json();

        setWeather(weatherData.current);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Failed to load weather data.");
      }

      setLoading(false);
    }

    if (location) {
      fetchWeather();
    }
  }, [location]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!weather) return null;

  return (
    <div>
      <h2>Weather Information</h2>
      <p>Temperature: {weather.temperature_2m}°F</p>
      <p>{weather.is_day ? "Daytime" : "Nighttime"}</p>
      <p>Rain: {weather.rain} inches</p>

      <button onClick={() => setSelectedWeather(null)}>Back to Main</button>
    </div>
  );
}
