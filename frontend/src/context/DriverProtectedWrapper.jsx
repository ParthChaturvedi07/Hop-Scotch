import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DriverDataContext } from "./DriverContext";
import axios from "axios";

export const DriverProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { driver, setDriver } = useContext(DriverDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/driver-login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/drivers/profile`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setDriver(response.data.driver);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/driver-login");
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
