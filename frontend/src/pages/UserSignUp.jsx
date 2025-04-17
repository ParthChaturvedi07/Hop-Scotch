import React, { useState } from "react";
import Logo from "../assets/images/031bd833-fab5-4988-93d4-a2165eddbc92-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
export const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { user, setUser } = React.useContext(UserDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        fullName: {
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
      };
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser,
        { withCredentials: true }
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
    }
  };
  ``;

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

          <button
            className="bg-black text-white font-bold rounded-lg px-4 py-3 w-full text-lg tracking-wide 
          shadow-md transition-transform transform hover:scale-105 hover:shadow-xl border-2 border-black"
          >
            Sign Up
          </button>

          <p className="text-center mt-3">
            Already a User?{" "}
            <Link className="text-blue-600 font-semibold" to="/login">
              Log In
            </Link>
          </p>
        </form>
      </div>

      <div className="relative z-10">
        <Link
          to="/driver-signup"
          className="bg-[#FFD700] flex items-center justify-center font-bold rounded-lg px-4 py-3 w-full text-lg tracking-wide 
          shadow-md transition-transform transform hover:scale-105 hover:shadow-xl border-2 border-black"
        >
          Sign Up as Driver
        </Link>
      </div>
    </div>
  );
};
