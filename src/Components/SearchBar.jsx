
import React, { useRef, useState } from "react";

import axios from 'axios';
import Board from "./Board";

const SearchBar = ()=>{
    const [ city, setCity ] = useState('')
/*     const [ details, setDetails ] = useState({
        main:'',
        sys:'',
        coord:'',
    }) */
    const [places, setPlaces] = useState([])


    const handleInput=(e)=>{
        setCity(e.target.value)
    }
    const handleselect =  ()=>{
         fetchWeather();
        
    }
 const fetchWeather = async ()=>{
    const app_id = import.meta.env.VITE_WEATHER_APP_ID;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${app_id}&units=metric`;
    try {
       const response = await axios.get(url);
       const data =  await response.data
       console.log(data)


       console.log(coord)
       const WeatherData = {
          temp: data.main.temp,
          humidity:data.main.humidity,
          feels_like:data.main.feels_like,
         }
        setPlaces([...places, city])
    } catch (error) {
        console.log(error)
    }

 }

    return(
        <>
        <section className="my-10">
            <div className="">
                
                <input type="text" value={city}  onChange={handleInput} placeholder="Search your city..." className=" focus:border-green-700 border-2 p-3 mx-4 rounded-full border-black shadow-2xl text-xl"/>
                <button type="button" onClick={handleselect} className="bg-amber-600 p-3 text-xl font-mono rounded-full border-2 border-black hover:bg-amber-400" >Search!</button>
            </div>
        </section>
        {WeatherData && <Board WeatherData={WeatherData} places={places}/>}
        </>
    );
}
export default SearchBar;
