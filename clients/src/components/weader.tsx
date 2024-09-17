import React, { useState, useEffect } from 'react';

interface WeatherData {
  main: {
    temp: number;
  };
}

const Weaders: React.FC = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
const apikey = import.meta.env.VITE_API_KEY;
// const apikey ="cb06270426571f273e11672077b55b39"
// console.log(apikey);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          setError('Unable to retrieve your location');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  }, []);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
       ` https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`
      );
      const data: WeatherData = await response.json();
      setTemperature(data.main.temp);
    } catch (error) {
      setError('Unable to fetch weather data');
    }
  };

  return (
    <div>
      <h1>Current Temperature</h1>
      {error ? (
        <p>{error}</p>
      ) : temperature !== null ? (
        <p>{temperature}°C</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weaders;