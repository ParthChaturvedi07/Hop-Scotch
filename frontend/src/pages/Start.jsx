import React from "react";
import Logo from "../assets/images/031bd833-fab5-4988-93d4-a2165eddbc92-removebg-preview.png";
import { Link } from "react-router-dom";

export const Start = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-between bg-white">
      <div
        className="bg-cover bg-center h-full w-full flex flex-col justify-between pt-4"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1637494653939-1e334d88cd02?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="">
          <img
            src={Logo}
            alt="HopScotch Logo"
            className="w-24 drop-shadow-lg filter grayscale contrast-200"
          />
        </div>

        <div className="bg-white pb-7 py-6 px-6 rounded-t-3xl shadow-lg border-4 border-black">
          <h2 className="text-3xl font-extrabold text-black text-center tracking-wide">
            Get Started with <span className="italic">HopScotch</span>
          </h2>

          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-6 text-lg font-semibold 
            shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};
