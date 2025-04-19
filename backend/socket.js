import { Server as socketIo } from "socket.io";
import userModel from "./models/user.model.js";
import driversModel from "./models/drivers.model.js";

let io;

export function initializeSocket(server) {
  io = new socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "driver") {
        await driversModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-driver", async (data) => {
      const { userId, location } = data;

      if (
        !location ||
        location.ltd === undefined ||
        location.lng === undefined
      ) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      console.log("Updating location for driver:", { userId, location });

      try {
        const updatedDriver = await driversModel.findByIdAndUpdate(
          userId,
          {
            location: {
              ltd: location.ltd,
              lng: location.lng,
            },
          },
          { new: true }
        );

        if (!updatedDriver) {
          return socket.emit("error", { message: "Driver not found" });
        }

        console.log("Driver location updated successfully:", updatedDriver);
      } catch (error) {
        console.log("Error updating driver location:", error);
        socket.emit("error", { message: "Failed to update location" });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

export function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.log("Socket.io not initialized");
  }
}
