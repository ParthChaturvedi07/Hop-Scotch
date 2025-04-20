import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import streetMap from "../assets/images/0_gwMx05pqII5hbfmX.gif";
import Logo from "../assets/images/031bd833-fab5-4988-93d4-a2165eddbc92-removebg-preview.png";
import { FinishRide } from "../components/FinishRide";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const DriverRiding = (props) => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  const finishRidePanelRef = useRef(null);

  const location = useLocation();
  const rideData = location.state?.ride || null;

  console.log(rideData);
  

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        y: 0,
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        y: "100% ",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 flex w-screen items-center justify-between z-10">
        <img className="w-16" src={Logo} alt="" />
        <Link
          to="/driver-login"
          className="h-10 w-10 bg-white border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] flex items-center justify-center rounded-full hover:scale-110 transition-transform"
        >
          <i className="text-lg font-medium ri-logout-circle-line"></i>
        </Link>
      </div>

      <div className="h-4/5">
        <img className="h-full w-full object-cover" src={streetMap} alt="" />
      </div>

      <div className="relative h-1/5 p-6 flex items-center justify-between border-t-4 border-white bg-black shadow-[0px_-4px_0_rgba(0,0,0,1)]">
        <h5
          className=" absolute top-0 left-1/2 text-xl text-white cursor-pointer hover:scale-110 transition-transform"
          onClick={() => {
            setFinishRidePanel(true);
          }}
        >
          <i className="ri-arrow-up-double-line"></i>
        </h5>
        <h4 className="text-xl text-white font-bold text-black drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
          4 Km away
        </h4>
        <button
          onClick={() => {
            setFinishRidePanel(true);
          }}
          className="bg-white border-2 border-black text-black font-bold px-8 py-3 rounded-xl shadow-[3px_3px_0_rgba(0,0,0,0)] hover:scale-105 transition-transform"
        >
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white translate-y-full rounded-t-2xl border-black border-t-4 shadow-[0_-5px_20px_rgba(0,0,0,0.2)]"
      >
        <FinishRide
          ride={rideData}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
};
