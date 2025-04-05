import React, { useState } from "react";
import { createContext } from "react";

export const DriverDataContext = createContext();
export const DriverContext = ({ children }) => {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div>
      <DriverDataContext.Provider value={value}>
        {children}
      </DriverDataContext.Provider>
    </div>
  );
};
