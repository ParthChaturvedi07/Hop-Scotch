import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/031bd833-fab5-4988-93d4-a2165eddbc92-removebg-preview.png";
import streetMap from "../assets/images/0_gwMx05pqII5hbfmX.gif";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import { LocationSearchPanel } from "../components/LocationSearchPanel";
import { ConfirmedRide } from "../components/ConfirmedRide";
import { VehiclePanel } from "../components/VehiclePanel";
import { WaitingForDriver } from "../components/WaitingForDriver";
import { LookingForDriver } from "../components/LookingForDriver";
import { SocketContext } from "../context/SocketContext";

export const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);

  // console.log(pickup, destination);

  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationsSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

  const navigate = useNavigate();

  // console.log(vehicleType);
  // console.log(waitingForDriverPanel);

  const { socket } = useContext(SocketContext);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  useEffect(() => {
    socket.emit("join", {
      userType: "user",
      userId: user._id,
    });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setWaitingForDriverPanel(true);
    setVehicleFound(false);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    console.log(ride);
    setWaitingForDriverPanel(false);
    navigate("/riding", { state: { ride } });
  });

  const handlePickupChange = async (e) => {
    e.preventDefault();
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data.suggestions || []);
    } catch (error) {
      console.error("Error fetching pickup suggestions:", error);
    }
  };

  const handleDestinationChange = async (e) => {
    e.preventDefault();
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationsSuggestions(response.data.suggestions || []);
    } catch (error) {
      console.error("Error fetching destination suggestions:", error);
    }
  };

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
        y: 0,
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        y: "100%",
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

  useGSAP(() => {
    if (waitingForDriverPanel) {
      gsap.to(WaitingForDriverRef.current, {
        y: 0,
      });
    } else {
      gsap.to(WaitingForDriverRef.current, {
        y: "100% ",
      });
    }
  }, [waitingForDriverPanel]);

  const findFare = async () => {
    if (!pickup || !destination) {
      console.error("Pickup and destination are required");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setVehiclePanelOpen(true);
      setPanelOpen(false);
      console.log(response.data);
      setFare(response.data.fare || {});
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  };

  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Ride created", response.data);
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

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
            <form
              onSubmit={(e) => onSubmitHandler(e)}
              className="space-y-2 relative"
            >
              <div className="line absolute h-12 w-1 top-[34%] bg-gray-900 left-5 rounded-full"></div>
              <input
                type="text"
                value={pickup}
                onChange={handlePickupChange}
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                placeholder="Add a pick-up location"
                className="w-full bg-gray-100 p-3 text-md text-center font-semibold border-2 border-black rounded-xl focus:outline-none focus:ring-1 focus:ring-black placeholder:text-sm hover:scale-105 transition-transform"
              />
              <input
                type="text"
                value={destination}
                onChange={handleDestinationChange}
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                placeholder="Enter your destination"
                className="w-full bg-gray-100 p-3 text-md text-center font-semibold border-2 border-black rounded-xl focus:outline-none focus:ring-1 focus:ring-black placeholder:text-sm hover:scale-105 transition-transform"
              />
            </form>
          </div>
          <div ref={panelRef} className="bg-white h-0 pr-5 pl-5">
            <LocationSearchPanel
              suggestions={
                activeField === "pickup"
                  ? pickupSuggestions
                  : destinationSuggestions
              }
              setPanelOpen={setPanelOpen}
              setVehiclePanelOpen={setVehiclePanelOpen}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
              findFare={findFare}
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
            selectVehicle={setVehicleType}
            fare={fare}
          />
        </div>

        <div
          ref={confirmRidePanelRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full rounded-t-2xl border-t-4 border-black shadow-[0_-5px_20px_rgba(0,0,0,0.2)]"
        >
          <ConfirmedRide
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            createRide={createRide}
          />
        </div>

        <div
          ref={vehicleFoundRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full rounded-t-2xl border-t-4 border-black shadow-[0_-5px_20px_rgba(0,0,0,0.2)]"
        >
          <LookingForDriver
            setVehicleFound={setVehicleFound}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
          />
        </div>
      </div>

      <div
        ref={WaitingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white rounded-t-2xl translate-y-full border-t-4 border-black px-3 py-6  shadow-[0_-5px_20px_rgba(0,0,0,0.2)]"
      >
        <WaitingForDriver
          setWaitingForDriverPanel={setWaitingForDriverPanel}
          ride={ride}
        />
      </div>
    </>
  );
};
