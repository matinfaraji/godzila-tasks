import { Box, Typography } from '@mui/material';
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        () => {
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
    } catch () {
      setError('Unable to fetch weather data');
    }
  };

  return (
    <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 160,
      height: 40,
      border: '1px solid #ccc',
      borderRadius: 2,
      backgroundColor: 'darkblue',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    }}
  >
    {error ? (
      <Typography sx={{ color: 'red' }}>{error}</Typography>
    ) : temperature !== null ? (
      <Typography sx={{ color: 'white' }}>{temperature}°C</Typography>
    ) : (
      <Typography sx={{ color: '#888' }}>Loading...</Typography>
    )}
  </Box>
  );
};

export default Weaders;