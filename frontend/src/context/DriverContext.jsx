import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const DriverDataContext = createContext();

export const DriverContext = ({ children }) => {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   console.log("Driver context updated:", driver);
  // }, [driver]);

  const updateDriver = (driverData) => {
    setDriver(driverData);
  };

  const value = {
    driver,
    setDriver,
    loading,
    setLoading,
    error,
    setError,
    updateDriver,
  };

  return (
    <DriverDataContext.Provider value={value}>
      {children}
    </DriverDataContext.Provider>
  );
};
