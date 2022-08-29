import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

function Hero() {
  return (
    <main className="w-full flex flex-col justify-top items-center md:justify-center h-screen px-14 pt-32 md:items-start ">
      <div className="flex flex-shrink-0 items-center mb-16 md:hidden">
        <Link to="/">
          <img
            className="h-16 w-auto"
            src="https://drive.google.com/uc?export=view&id=1UsbTcP9u-KK7lJYDjSD3HgcuWiP5laLF"
            alt="Jobify Logo"
          />
        </Link>
      </div>
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl md:mb-16 lg:mb-4">
          <span className="">Move Up</span>{" "}
          <span className="text-sky-600">Today</span>
        </h1>
        <p className="mt-3 max-w-md text-base text-gray-500 md:max-w-sm lg:max-w-lg">
          Find Startup Jobs, startup talent, Employment & Career Opportunities
        </p>
      </div>
      <Search />
      <div className=" absolute w-80 right-0 md:w-5/12">
        <img
          className="w-full hidden md:block"
          src="https://drive.google.com/uc?export=view&id=10NzLSLOerNY1hnIoukfZjpg-EiHk_GRK"
          alt="Hero illustration , Jobify Header"
        />
      </div>
    </main>
  );
}

export default Hero;
