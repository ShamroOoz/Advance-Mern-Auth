import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className=" grid content-center sm:mt-20 ">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="text-indigo-500 font-bold text-7xl">404</div>

          <div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
            This page does not exist
          </div>

          <div className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
            The page you are looking for could not be found.
          </div>
          <span className="text-center font-bold my-10 ">
            <Link to="/" className="text-pink-500 hover:text-pink-500/20">
              GO BACK
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
