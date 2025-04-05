import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DriverDataContext } from "../context/DriverContext";

export const DriverLogout = () => {
  const { setDriver } = useContext(DriverDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get(`${import.meta.env.VITE_BASE_URL}/drivers/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");
      setDriver(null);
      navigate("/driver-login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  });
  return <div>DriverLogout</div>;
};
