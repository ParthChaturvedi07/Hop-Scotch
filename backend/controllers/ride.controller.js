import * as rideService from "../services/ride.service.js";
import * as googleMapsService from "../services/googlemaps.service.js";
import { validationResult } from "express-validator";
import { sendMessageToSocketId } from "../socket.js";
import rideModel from "../models/ride.model.js";

export const createRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    res.status(201).json({
      message: "Ride created successfully",
      ride,
    });

    const pickupCoordinates = await googleMapsService.getAddressCoordinates(
      pickup
    );
    console.log("Pickup Coordinates:", pickupCoordinates);

    const driversInRadius = await googleMapsService.getDriversInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );

    ride.otp = "";

    const rideWithUser = await rideModel.findOne(ride._id).populate("user");

    driversInRadius.map((driver) => {
      // console.log(driver, ride);

      sendMessageToSocketId(driver.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (error) {
    console.error("Error creating ride:", error);
    res.status(500).json({ message: "Error creating ride" });
  }
};

export const getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;
  console.log("Pickup:", pickup);
  console.log("Destination:", destination);

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json({
      message: "Fare calculated successfully",
      fare,
    });
  } catch (error) {
    console.error("Error calculating fare:", error);
    res.status(500).json({ message: "Error calculating fare" });
  }
};

export const confirmRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  const driverId = req.driver._id;

  try {
    const ride = await rideService.confirmRide(rideId, driverId);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json({
      message: "Ride confirmed successfully",
      ride,
    });
  } catch (err) {
    console.error("Error confirming ride:", err);
    return res.status(500).json({ message: "Error confirming ride" });
  }
};
