import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "./context/UserContext.jsx";
import { DriverContext } from "./context/DriverContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DriverContext>
      <UserContext>
        <SocketProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </SocketProvider>
      </UserContext>
    </DriverContext>
  </BrowserRouter>
);
