import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
export const ConfirmRidePopUp = (props) => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: props.ride._id,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        props.setConfirmRidePopUpPanel(false);
        props.setRidePopUpPanel(false);
        navigate("/driver-riding", { state: { ride: props.ride } });
      }
    } catch (error) {
      if (
        error?.response?.data?.message?.toLowerCase().includes("invalid otp")
      ) {
        toast.error("Invalid OTP! Please try again.");
      } else {
        toast.error("Something went wrong. Try again.");
      }
      console.error("Error starting ride:", error);
    }
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
          <h2 className="text-lg font-medium">
            {props.ride?.user.fullName.firstName +
              " " +
              props.ride?.user.fullName.lastName}
          </h2>
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
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-5 p-2 mb-2 border-2 border-black rounded-xl bg-gray-50 shadow-[3px_3px_0_rgba(0,0,0,1)]">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">48/B</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {props.ride?.destination}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex items-center gap-5 p-2 border-2 border-black rounded-xl bg-gray-50 shadow-[3px_3px_0_rgba(0,0,0,1)] ">
                <i className="ri-money-rupee-circle-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">
                    ₹{props.ride?.fare.toFixed(2)}
                  </h3>
                  <p className="text-sm -mt-1 text-gray-600">Cash 💵</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form
          onSubmit={submitHandler}
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
            <button className="text-center w-full bg-green-500 border-2 border-black text-white font-semibold p-3 rounded-xl shadow-[3px_3px_0_rgba(0,0,0,1)] hover:scale-105 transition-transform">
              Confirm
            </button>
            <button
              onClick={() => {
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
