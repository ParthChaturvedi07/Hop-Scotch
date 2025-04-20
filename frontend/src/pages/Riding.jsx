import React, { useContext } from "react";
import streetMap from "../assets/images/0_gwMx05pqII5hbfmX.gif";
import carLogo from "../assets/images/—Pngtree—3d super car with transparent_5357818.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { LiveTracking } from "../components/LiveTracking";

export const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] flex items-center justify-center rounded-full hover:scale-110 transition-transform"
      >
        <i className=" text-lg font-medium ri-home-5-line"></i>
      </Link>
      <div className="h-1/2 overflow-hidden">
       <LiveTracking/>
      </div>
      <div className="h-1/2 p-2 border-t-4 border-black">
        <div className="flex items-center justify-between bg-white px-4 py-3 ">
          <img className="h-20 animate-bounce-subtle" src={carLogo} alt="Car" />
          <div className="text-right">
            <h2 className="text-xl font-bold">
              {ride?.driver?.fullName.firstName}
            </h2>
            <h4 className="text-md font-bold -mt-1 -mb-1">
              {ride?.driver?.vehicle?.plate}
            </h4>
            <p className="text-sm text-gray-600">Wagon-R, Maruti Suzuki</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-center ">
          <div className="w-full flex items-center gap-4 p-3 border-2 border-black rounded-xl bg-gray-50 shadow-[3px_3px_0_rgba(0,0,0,1)]">
            <i className="ri-map-pin-user-fill text-xl"></i>
            <div>
              <h3 className="text-lg font-bold">48/B</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
            </div>
          </div>

          <div className="w-full flex items-center gap-4 p-3 border-2 border-black rounded-xl bg-gray-50 shadow-[3px_3px_0_rgba(0,0,0,1)]">
            <i className="ri-money-rupee-circle-fill text-xl"></i>
            <div>
              <h3 className="text-lg font-bold">₹{ride?.fare.toFixed(2)}</h3>
              <p className="text-sm -mt-1 text-gray-600">Total Fare</p>
            </div>
          </div>

          <button className="w-full mt-5 bg-green-500 border-2 border-black text-white font-semibold p-3 rounded-xl shadow-[3px_3px_0_rgba(0,0,0,1)] hover:scale-105 transition-transform">
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};
