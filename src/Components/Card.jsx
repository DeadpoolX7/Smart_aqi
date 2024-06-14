
import React from "react";

const Card = (props)=>{
    return(
        <>
        <div className="flex">
        <label for="checkboxInput" className="bookmark">
  <input type="checkbox" id="checkboxInput" />
  <svg
    width="15"
    viewBox="0 0 50 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="svgIcon"
  >
    <path
      d="M46 62.0085L46 3.88139L3.99609 3.88139L3.99609 62.0085L24.5 45.5L46 62.0085Z"
      stroke="black"
      stroke-width="7"
    ></path>
  </svg>
</label>

        <div className="w-full  bg-orange-400 h-full">
            <h1 className="text-2xl text-center">{props.place}</h1>
            <div className="flex justify-around">
                <p>Temp: {props.temp}</p>
                <p>Humidity: {props.humidity}</p>
            </div>
        </div>
        </div>
        </>
    );
}
export default Card;