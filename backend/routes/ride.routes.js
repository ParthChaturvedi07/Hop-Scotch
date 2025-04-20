import express from "express";
const router = express.Router();
import { body, query } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";

import * as rideController from "../controllers/ride.controller.js";
import { authDriver } from "../middlewares/authDriver.middleware.js";

router.post(
  "/create",
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Pickup location must be at least 3 characters long"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination location must be at least 3 characters long"),
  body("vehicleType")
    .isString()
    .isIn(["car", "motorcycle", "auto"])
    .withMessage("Invalid vehicle type"),
  authUser,
  rideController.createRide
);

router.get(
  "/get-fare",
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Pickup location must be at least 3 characters long"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination location must be at least 3 characters long"),
  authUser,
  rideController.getFare
);

router.post(
  "/confirm",
  body("rideId").isMongoId().withMessage("Invalid ride ID"),
  authDriver,
  rideController.confirmRide
);

router.get(
  "/start-ride",
  authDriver,
  query("rideId").isMongoId().withMessage("Invalid ride ID"),
  query("otp")
    .isNumeric()
    .isLength({ min: 4, max: 4 })
    .withMessage("Invalid OTP"),
  rideController.startRide
);

router.post(
  "/end-ride",
  authDriver,
  body("rideId").isMongoId().withMessage("Invalid ride ID"),
  rideController.endRide
);

export default router;
