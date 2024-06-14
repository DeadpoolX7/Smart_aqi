
import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import { useLocation } from 'react-router-dom';
/* import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, remove } from "firebase/database"; */

// Your Firebase configuration
/* const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); */

const WeatherApp = () => {
  const location = useLocation();
  const { email } = location.state;
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading ] = useState(false)

  const fetchWeather = async (cityName) => {
    setIsLoading(true);
    const apiKey = 'e2bdca0d09195071510e8787c1a1ef1b';
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const aqiResponse = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherResponse.data.coord.lat}&lon=${weatherResponse.data.coord.lon}&appid=${apiKey}`);

    const weather = {
      temp: weatherResponse.data.main.temp,
      feels_like: weatherResponse.data.main.feels_like,
      humidity: weatherResponse.data.main.humidity,
      sunrise: weatherResponse.data.sys.sunrise,
      sunset: weatherResponse.data.sys.sunset,
      aqi: aqiResponse.data.list[0].main.aqi,
    };

     const newCity = {
      name: cityName,
      weather,
    };

    // Save to Firebase
    /*const cityListRef = ref(database, 'cities');
    const newCityRef = push(cityListRef);
    set(newCityRef, newCity); */

    setCities([...cities, newCity]);
    setIsLoading(false)
  };

/*   const handleDeleteCity = async (cityName) => {
    // Find the city in the database and remove it
    const cityListRef = ref(database, 'cities');
    const citySnapshot = await cityListRef.orderByChild('name').equalTo(cityName).once('value');
    const updates = {};
    citySnapshot.forEach((childSnapshot) => {
      updates[childSnapshot.key] = null;
    });
    cityListRef.update(updates);

    setCities(cities.filter(city => city.name !== cityName));
  }; */

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
      setCity('');
    }
  };

  return (
    <div className="p-4 ">
      <h1 className='text-center font-bold text-5xl '>Hello, <span className='block text-xl font-normal '>{email.split('@')[0]}!</span></h1>
      <div className="m-4 flex justify-center ">
        <input
          type="text"
          className="border p-2 shadow-xl"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
        />
        <button onClick={handleSearch} className="shadow-lg bg-blue-500 text-white p-2 ml-2 hover:rounded-full hover:transition-all hover:ease-in-out">
          Search
        </button>
      </div>
      <div>
        {cities.map((cityData, index) => (
          <div key={index} className="relative">
            {isLoading ? (<div className="flex justify-center items-center mt-8">
  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-gray-900"></div>
</div>): <WeatherCard city={cityData.name} weather={cityData.weather} />}
{/*             <button onClick={() => handleDeleteCity(cityData.name)} className="absolute top-0 right-0 bg-red-500 text-white p-2">
              Delete
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
