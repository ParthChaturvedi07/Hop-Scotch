import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Start } from "./pages/Start";
import { UserLogin } from "./pages/UserLogin";
import { UserSignUp } from "./pages/UserSignUp";
import { DriverLogin } from "./pages/DriverLogin";
import { DriverSignUp } from "./pages/DriverSignUp";
import { UserDataContext } from "./context/UserContext";
import { Home } from "./pages/Home";
import { UserProtectedWrapper } from "./context/userProtectedWrapper";
import { UserLogout } from "./pages/UserLogout";
import { DriverHome } from "./pages/DriverHome";
import { DriverProtectedWrapper } from "./context/DriverProtectedWrapper";
import { DriverLogout } from "./pages/DriverLogout";
import { Riding } from "./pages/Riding";
import { DriverRiding } from "./pages/DriverRiding";
export function App() {
  const ans = useContext(UserDataContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/driver-signup" element={<DriverSignUp />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/riding"
          element={
            <UserProtectedWrapper>
              <Riding />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />

        <Route
          path="/driver-home"
          element={
            <DriverProtectedWrapper>
              <DriverHome />
            </DriverProtectedWrapper>
          }
        />
        <Route
          path="/driver/logout"
          element={
            <DriverProtectedWrapper>
              <DriverLogout />
            </DriverProtectedWrapper>
          }
        />
        <Route
          path="/driver-riding"
          element={
            <DriverProtectedWrapper>
              <DriverRiding />
            </DriverProtectedWrapper>
          }
        />
      </Routes>
    </div>
  );
}
