import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

export const UserLogout = () => {
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Logout success: Remove token and update state
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
      }
    };

    logoutUser();
  }, [navigate, setUser]);

  return <div>Logging out...</div>;
};
