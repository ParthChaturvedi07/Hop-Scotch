import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const FinishRide = (props) => {
  const navigate = useNavigate();

  const endRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      props.setFinishRidePanel(false);
      navigate("/driver-home");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h3 className="text-2xl font-black text-black tracking-wide ">
          Finish this Ride
        </h3>
        <h5
          className="text-xl text-black cursor-pointer hover:scale-110 transition-transform"
          onClick={() => {
            props.setFinishRidePanel(false);
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
            {props.ride?.user?.fullName.firstName}
          </h2>
        </div>
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

        <div className="flex flex-col items-center justify-between w-full mt-2">
          <button
            onClick={endRide}
            className="text-center w-full bg-green-500 border-2 border-black text-white font-semibold p-3 rounded-xl shadow-[3px_3px_0_rgba(0,0,0,1)] hover:scale-105 transition-transform"
          >
            Finish Ride
          </button>
          <p className="text-xs font-semibold text-red-600 p-3 whitespace-nowrap">
            Click on Finish Ride button on payment completion !
          </p>
        </div>
      </div>
    </div>
  );
};
