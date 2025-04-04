import { useState, useEffect } from 'react';

export default function WeatherList({ setSelectedWeather }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,rain,precipitation_probability,is_day&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch');
                const data = await res.json();
                setWeather(data.hourly);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
            setLoading(false);
        }
        fetchWeather();
    }, []);

    if (loading) return <p>Loading weather...</p>;
    if (!weather) return <p>No weather data available.</p>;

    return (
        <div>
            <h2>Hourly Forecast</h2>
            <ul>
                {weather.time.slice(0, 5).map((time, index) => (
                    <li key={index}>
                        {time}: {weather.temperature_2m[index]}°F, Rain: {weather.rain[index]} inches
                    </li>
                ))}
            </ul>
            <button onClick={() => setSelectedWeather(null)}>Back to Main</button>
        </div>
    );
}
