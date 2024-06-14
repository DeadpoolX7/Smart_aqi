
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function ModalContent(props) {
  const [AIanswer, setAIanswer ] = useState('')
  const [isLoading, setIsLoading ] = useState(false)
    const genAI  = new GoogleGenerativeAI(import.meta.env.VITE_GENERATIVE_AI)
    const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'})
    const prompt = `Based on the following weather data, provide tips for a safe and healthy day in 5 sentences max:
    Temperature: ${props.temp}°C
    Feels Like: ${props.feels_like}°C
    Humidity: ${props.humidity}%
    Sunrise: ${props.sunrise}
    Sunset: ${props.sunset}
    AQI: ${props.aqi}`;
    const handleAI  = async ()=>{
      setIsLoading(true)
        try {
            const result = await model.generateContent(prompt)
            const answer =   result.response;

            setAIanswer(answer.text());
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
      <div className=" flex-col fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
        <button className="text-black m-2 p-2 text-2xl font-bold bg-slate-300 rounded-full hover:bg-red-700" onClick={props.onClose}>X</button>
        <div className="bg-white  rounded-lg shadow-lg p-4 max-w-lg w-full transition-transform transform scale-100">
        <p className="text-center font-semibold text-xl my-2  underline">{props.city.toUpperCase()}</p>
        <p>Feels Like: {props.feels_like}°C</p>
      <p>Humidity: {props.humidity}%</p>
      <p>Sunrise: {props.sunrise}</p>
      <p>Sunset: {props.sunset}</p>
      <div className="m-5">
        <button onClick={handleAI} className="hover:text-white text-xl font-semibold  px-4 py-2  border-2  rounded-full shadow-xl transition-all duration-300 ease-in-out transform hover:bg-sky-500  hover:shadow-2xl hover:scale-105">
        <span className="absolute inset-0 rounded-full border-4 border-transparent hover:border-gradient-animate"></span>

          Ask A.I.
        </button>

      </div>
      {isLoading ? (
        <div className="flex justify-center items-center mt-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-gray-900"></div>
      </div>
      
      ) : (AIanswer  && (<p className=" overflow-y-scroll text-xl my-2 p-2">{AIanswer}</p>))}
        </div>
      </div>
    );
  }
  