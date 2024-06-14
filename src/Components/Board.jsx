
import React, { useState } from "react";
import Card from "./Card";

const Board = ({WeatherData,places})=>{
    console.log(WeatherData.sys)
    return(
        <section className=" w-3/4 h-2/4  border-2 border-black rounded-xl">
            <div className="overflow-y-scroll h-full w-full border rounded-xl scro scroll-smooth ">
                {places && places.map((place,index)=>(
                    <Card key={index} coord ={WeatherData.coord} main={WeatherData.main} sys={WeatherData.sys} humidity={WeatherData.humidity} place={place} temp={WeatherData.temp}/>
                ))}
            </div>
        </section>
    );
}
export default Board;