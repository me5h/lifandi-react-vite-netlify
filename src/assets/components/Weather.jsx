// src/components/Weather.jsx
import { useState, useEffect } from 'react';

function Weather({ lat, lon }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            if (!lat || !lon) return;
            const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch weather data');
                const data = await response.json();
                setWeather(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [lat, lon]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            {weather ? (
                <div>
                    <h3>Weather in {weather.name}</h3>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].main}</p>
                    <p>Details: {weather.weather[0].description}</p>
                </div>
            ) : (
                <p>No weather data available.</p>
            )}
        </div>
    );
}

export default Weather;
