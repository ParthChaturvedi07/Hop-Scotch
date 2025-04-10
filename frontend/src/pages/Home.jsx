import React, { useRef, useState } from "react";
import Logo from "../assets/images/031bd833-fab5-4988-93d4-a2165eddbc92-removebg-preview.png";
import streetMap from "../assets/images/ubermapvisuals-thumb-640xauto-905052.png";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import { LocationSearchPanel } from "../components/LocationSearchPanel";
import { ConfirmedRide } from "../components/ConfirmedRide";
import { VehiclePanel } from "../components/VehiclePanel";
import { WaitingForDriver } from "../components/WaitinfForDriver";
import { LookingForDriver } from "../components/LookingForDriver";

export const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);

  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.set(panelRef.current, { display: "block" });
      gsap.to(panelRef.current, {
        height: "70%",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(panelRef.current, { display: "none" });
        },
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        y: 0,
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        y: "100% ",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        y: 0,
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        y: "100% ",
      });
    }
  }, [vehicleFound]);

  // useGSAP(() => {
  //   if (waitingForDriverPanel) {
  //     gsap.to(WaitingForDriverRef.current, {
  //       y: 0,
  //     });
  //   } else {
  //     gsap.to(WaitingForDriverRef.current, {
  //       y: "100% ",
  //     });
  //   }
  // }, [WaitingForDriverRef]);

  return (
    <>
      <div className="h-screen relative">
        <img
          src={Logo}
          alt="HopScotch Logo"
          className="w-16 absolute left-6 top-6"
        />

        <div className="h-screen w-screen">
          <img
            className="h-full w-full object-cover opacity-90"
            src={streetMap}
            alt=""
          />
        </div>

        <div className=" absolute flex flex-col justify-end h-screen w-full h-screen  top-0">
          <div className="h-[30%] relative p-5 bg-white rounded-t-2xl border-t-4 border-black">
            <div className="flex justify-between items-center">
              <h4 className="text-2xl font-bold text-black">Find a Trip</h4>
              <h5
                className={`${panelOpen ? "" : "hidden"} text-xl`}
                onClick={() => {
                  setPanelOpen(false);
                }}
              >
                <i className="ri-arrow-down-double-line"></i>
              </h5>
            </div>
            <form onSubmit={(e) => onSubmitHandler(e)} className="space-y-2">
              <div className="line absolute h-20 w-1 top-[40%] bg-gray-900 left-10 rounded-full"></div>
              <input
                type="text"
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                }}
                onClick={() => {
                  setPanelOpen(true);
                }}
                placeholder="Add a pick-up location"
                className="w-full bg-gray-100 p-3 text-md text-center font-semibold border-2 border-black rounded-xl focus:outline-none focus:ring-1 focus:ring-black placeholder:text-sm hover:scale-105 transition-transform"
              />
              <input
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
                onClick={() => {
                  setPanelOpen(true);
                }}
                placeholder="Enter your destination"
                className="w-full bg-gray-100 p-3 text-md text-center font-semibold border-2 border-black rounded-xl focus:outline-none focus:ring-1 focus:ring-black placeholder:text-sm hover:scale-105 transition-transform"
              />
            </form>
          </div>
          <div ref={panelRef} className="bg-white h-0 pr-5 pl-5">
            <LocationSearchPanel
              setPanelOpen={setPanelOpen}
              setVehiclePanelOpen={setVehiclePanelOpen}
            />
          </div>
        </div>

        <div
          ref={vehiclePanelRef}
          className="fixed w-full z-10 bottom-0 bg-white translate-y-full py-8 px-3 rounded-t-2xl border-t-4 border-black shadow-[0_-5px_20px_rgba(0,0,0,0.2)]"
        >
          <VehiclePanel
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>

        <div
          ref={confirmRidePanelRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full rounded-t-2xl border-t-4 border-black shadow-[0_-5px_20px_rgba(0,0,0,0.2)]"
        >
          <ConfirmedRide
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
          />
        </div>

        <div
          ref={vehicleFoundRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full rounded-t-2xl border-t-4 border-black shadow-[0_-5px_20px_rgba(0,0,0,0.2)]"
        >
          <LookingForDriver setVehicleFound={setVehicleFound} />
        </div>
      </div>

      <div
        ref={WaitingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white rounded-t-2xl border-t-4 border-black px-3 py-6  shadow-[0_-5px_20px_rgba(0,0,0,0.2)]"
      >
        <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>
    </>
  );
};
