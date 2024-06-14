import React, { useState } from 'react';
import {createPortal } from 'react-dom';
import ModalContent from './ModalContent';

const WeatherCard = ({ city, weather }) => {
    const [showModal, setShowModal] = useState(false);

    
  return (
    <div className="bg-white shadow-2xl rounded p-4 m-4 cursor-pointer">
      <h2 className="text-xl font-bold text-center">{city.toUpperCase()}</h2>
      <div className='flex justify-between' onClick={()=>setShowModal(true)}>
      <p>Air Quality Index (AQI): {weather.aqi}</p>
      <p>Temperature: {weather.temp}°C</p>
      </div>



{showModal && createPortal(<ModalContent onClose={()=>setShowModal(false)} temp={weather.temp} aqi={weather.aqi} city={city} feels_like={weather.feels_like} humidity={weather.humidity} sunrise={new Date(weather.sunrise * 1000).toLocaleTimeString()} sunset={new Date(weather.sunset * 1000).toLocaleTimeString()}/>,
document.body
)}
    </div>
  );
};

export default WeatherCard;
