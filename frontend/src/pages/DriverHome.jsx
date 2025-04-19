import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import streetMap from "../assets/images/0_gwMx05pqII5hbfmX.gif";
import Logo from "../assets/images/031bd833-fab5-4988-93d4-a2165eddbc92-removebg-preview.png";
import { Link } from "react-router-dom";
import { DriverDetails } from "../components/DriverDetails";
import { RidePopUp } from "../components/RidePopUp";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ConfirmRidePopUp } from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";

export const DriverHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);

  const ridePopupRef = useRef(null);
  const confirmRidePopupRef = useRef(null);

  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const driver = JSON.parse(localStorage.getItem("driver"));

  useEffect(() => {
    socket.emit("join", {
      userType: "driver",
      userId: driver._id,
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log({
          //   userId: driver._id,
          //   location: {
          //     ltd: position.coords.latitude,
          //     lng: position.coords.longitude,
          //   },
          // });

          socket.emit("update-location-driver", {
            userId: driver._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  });

  socket.on("new-ride", (data) => {
    console.log("New ride request received:", data);
    setRide(data);
    // setConfirmRidePopUpPanel(true);
    setRidePopUpPanel(true);
  });

  async function confirmRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
          driverId: driver._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRidePopUpPanel(false);
      setConfirmRidePopUpPanel(true);
      console.log("Ride confirmed:", response.data);
    } catch (error) {
      console.error(
        "Error confirming ride:",
        error.response?.data || error.message
      );
    }
  }

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopupRef.current, {
        y: 0,
      });
    } else {
      gsap.to(ridePopupRef.current, {
        y: "100% ",
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopupRef.current, {
        y: 0,
      });
    } else {
      gsap.to(confirmRidePopupRef.current, {
        y: "100% ",
      });
    }
  }, [confirmRidePopUpPanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 flex w-screen items-center justify-between">
        <img className="w-16" src={Logo} alt="" />
        <Link
          to="/driver-login"
          className=" h-10 w-10 bg-white border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] flex items-center justify-center rounded-full hover:scale-110 transition-transform"
        >
          <i className=" text-lg font-medium ri-logout-circle-line"></i>
        </Link>
      </div>
      <div className="h-[70%]">
        <img className="h-full w-full object-cover" src={streetMap} alt="" />
      </div>
      <div className=" h-[30%] p-6 border-t-4 border-black">
        <DriverDetails />
      </div>
      <div
        ref={ridePopupRef}
        className="fixed w-full z-10 bottom-0 bg-white translate-y-full rounded-t-2xl border-black border-t-4 shadow-[0_-5px_20px_rgba(0,0,0,0.2)]"
      >
        <RidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupRef}
        className="fixed w-full z-10 bottom-0 bg-white translate-y-full rounded-t-2xl border-black border-t-4 shadow-[0_-5px_20px_rgba(0,0,0,0.2)]"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
};
