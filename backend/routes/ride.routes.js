import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";

import * as rideController from "../controllers/ride.controller.js";

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

export default router;
