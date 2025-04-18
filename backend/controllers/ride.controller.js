import * as rideService from "../services/ride.service.js";
import { validationResult } from "express-validator";

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

    return res.status(201).json({
      message: "Ride created successfully",
      ride,
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
