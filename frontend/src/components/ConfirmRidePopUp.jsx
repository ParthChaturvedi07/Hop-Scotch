import React, { useState } from "react";
import { Link } from "react-router-dom";

export const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h3 className="text-2xl font-black text-black tracking-wide ">
          Confirm this Ride to start
        </h3>
        <h5
          className="text-xl text-black cursor-pointer hover:scale-110 transition-transform"
          onClick={() => {
            props.setConfirmRidePopUpPanel(false);
          }}
        >
          <i className="ri-arrow-down-double-line"></i>
        </h5>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-10 rounded-full object-cover w-10"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT13yGsjxBwuebdAD9_KMT5t84rzyDGFsLYow&s"
            alt=""
          />
          <h2 className="text-lg font-medium">Manhus Kanpuri</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex gap-2 flex-col items-center justify-between">
        <img
          className="w-44 drop-shadow-[3px_3px_0_rgba(0,0,0,1)] animate-bounce-subtle"
          alt=""
        />
        <div className="w-full ">
          <div className="flex items-center gap-4 p-2 mb-2 border-2 border-black rounded-xl bg-gray-50 shadow-[3px_3px_0_rgba(0,0,0,1)]">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kantariya Talab, Kanpur
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-5 p-2 mb-2 border-2 border-black rounded-xl bg-gray-50 shadow-[3px_3px_0_rgba(0,0,0,1)]">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">48/B</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  Shyam Nagar, Kanpur
                </p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex items-center gap-5 p-2 border-2 border-black rounded-xl bg-gray-50 shadow-[3px_3px_0_rgba(0,0,0,1)] ">
                <i className="ri-money-rupee-circle-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">₹193.20</h3>
                  <p className="text-sm -mt-1 text-gray-600">
                    Kantariya Talab, Kanpur
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          action=""
          className="w-full flex flex-col items-center gap-2 mt-3"
        >
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="number"
            placeholder="Enter OTP"
            className="w-full bg-gray-100 p-3 text-md text-center font-semibold border-2 border-black rounded-xl focus:outline-none focus:ring-1 focus:ring-black placeholder:text-sm transition-transform"
          />
          <div className="flex items-center justify-between gap-4 w-full">
            <Link
              to="/driver-riding"
              onClick={() => {}}
              className="text-center w-full bg-green-500 border-2 border-black text-white font-semibold p-3 rounded-xl shadow-[3px_3px_0_rgba(0,0,0,1)] hover:scale-105 transition-transform"
            >
              Confirm
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false);
              }}
              className="w-full bg-red-600 border-2 border-black text-white font-semibold p-3 rounded-xl shadow-[3px_3px_0_rgba(0,0,0,1)] hover:scale-105 transition-transform"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
