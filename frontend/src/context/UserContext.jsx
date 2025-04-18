import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // console.log(user);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    error,
    setError,
  };
  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
