
import React from "react";

const Navbar = ()=>{
    return(
        <nav className="bg-black h-max p-2">
        <div className="grid grid-cols-3 items-center">
          <div className="col-span-1"></div>
          <div className="col-span-1 text-center">
            <h1 className="text-blue-800 text-3xl">AQI</h1>
          </div>
          <div className="col-span-1 text-right">
            <a href="https://github.com/DeadpoolX7/" target="_blank" rel="noopener noreferrer">
              <img src="https://imgs.search.brave.com/KXL45Ky6mn4L5JZiL_5V069ITX6UnIz6ZTlN8LGDJfI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9HaXRIdWIv/R2l0SHViLUljb24t/V2hpdGUtRGFyay1C/YWNrZ3JvdW5kLUxv/Z28ud2luZS5zdmc.svg" alt="GitHub" className="w-20 h-10 rounded-full inline-block" />
            </a>
          </div>
        </div>
      </nav>
    );
}
export default Navbar;