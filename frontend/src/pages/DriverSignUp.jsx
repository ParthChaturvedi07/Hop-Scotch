import React, { useEffect, useState } from "react";
import Logo from "../assets/images/031bd833-fab5-4988-93d4-a2165eddbc92-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { DriverDataContext } from "../context/DriverContext";
import axios from "axios";
export const DriverSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { driver, setDriver } = React.useContext(DriverDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newDriver = {
        fullName: {
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType,
        },
      };
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("");

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/drivers/register`,
        newDriver
      );
      if (response.status === 201) {
        const data = response.data;
        setDriver(data.driver);
        localStorage.setItem("driver", JSON.stringify(data.driver));
        localStorage.setItem("token", data.token);
        navigate("/driver-home");
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div
      className="p-5 min-h-screen flex flex-col justify-center items-center gap-5 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/b/sketch-traffic-lights-23322601.jpg')",
      }}
    >
      <div className="relative z-10 bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg border-4 border-black max-w-sm w-full">
        <img
          src={Logo}
          alt="HopScotch Logo"
          className="w-20 drop-shadow-lg filter grayscale contrast-200 mb-6"
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-2xl font-bold text-black mb-3">
            What's your name
          </h3>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-gray-200 w-1/2 rounded-lg px-3 py-2 text-lg placeholder:text-gray-500 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <input
              className="bg-gray-200 w-1/2 rounded-lg px-3 py-2 text-lg placeholder:text-gray-500 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-2xl font-bold text-black mb-3">
            What's your email?
          </h3>
          <input
            className="bg-gray-200 mb-5 rounded-lg px-4 py-3 w-full text-lg placeholder:text-gray-500 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />

          <h3 className="text-2xl font-bold text-black mb-3">Enter Password</h3>
          <input
            className="bg-gray-200 mb-5 rounded-lg px-4 py-3 w-full text-lg placeholder:text-gray-500 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />

          <h3 className="text-2xl font-bold text-black mb-3">
            Vehicle Information
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-7">
            <input
              required
              className="bg-gray-200 rounded-lg px-4 py-3 text-lg placeholder:text-sm text-gray-500 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
            />
            <input
              required
              className="bg-gray-200 rounded-lg px-4 py-3 text-lg placeholder:text-sm text-gray-500 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
            />
            <input
              required
              className="bg-gray-200 rounded-lg px-4 py-3 text-lg placeholder:text-sm text-gray-500 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
            />
            <select
              required
              className="bg-gray-200 rounded-lg px-4 py-3 text-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="" disabled className="text-gray-500 text-sm">
                Select Vehicle Type
              </option>
              <option
                value="car"
                className="text-black bg-white hover:bg-gray-300"
              >
                🚗 Car
              </option>
              <option
                value="motorcycle"
                className="text-black bg-white hover:bg-gray-300"
              >
                🏍️ Motorcycle
              </option>
              <option
                value="auto"
                className="text-black bg-white hover:bg-gray-300"
              >
                🚜 Auto
              </option>
            </select>
          </div>

          <button
            className="bg-[#FFD700] font-bold rounded-lg px-4 py-3 w-full text-lg tracking-wide 
          shadow-md transition-transform transform hover:scale-105 hover:shadow-xl border-2 border-black"
          >
            Create Driver Account
          </button>

          <p className="text-center mt-3">
            Already a Driver?{" "}
            <Link className="text-blue-600 font-semibold" to="/driver-login">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="relative z-10">
        <Link
          to="/signup"
          className="bg-black text-white flex items-center justify-center font-bold rounded-lg px-4 py-3 w-full text-lg tracking-wide 
          shadow-md transition-transform transform hover:scale-105 hover:shadow-xl border-2 border-black"
        >
          Sign Up as Passenger
        </Link>
      </div>
    </div>
  );
};
