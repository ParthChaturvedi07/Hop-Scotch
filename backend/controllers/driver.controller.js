import driversModel from "../models/drivers.model.js";
import { validationResult } from "express-validator";
import * as driverService from "../services/driver.service.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const registerDriver = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, vehicle } = req.body;

  if (typeof fullName === "string") {
    fullName = {
      firstName: fullName.split(" ")[0] || "",
      lastName: fullName.split(" ")[1] || "",
    };
  }
  try {
    const driver = await driversModel.findOne({ email });

    if (driver) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Driver already exists" }] });
    }

    const hashedPassword = await driversModel.hashPassword(password);

    const newDriver = await driverService.createDriver({
      firstName: fullName.firstName || "",
      lastName: fullName.lastName || "",
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = newDriver.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res
      .status(201)
      .json({ message: "Driver registered successfully", token, newDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginDriver = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const driver = await driversModel.findOne({ email }).select("+password");
    if (!driver) {
      return res.status(400).json({ errors: [{ msg: "Driver not found" }] });
    }

    const isMatch = await driver.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const token = driver.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "Strict",
    });

    res
      .status(200)
      .json({ message: "Driver logged in successfully", driver, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getDriverProfile = async (req, res) => {
  return res.status(201).json(req.driver);
};

export const logoutDriver = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    await blacklistTokenModel.create({ token });

    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "Strict",
      expires: new Date(0),
      path: "/",
    });

    res.json({ message: "Driver logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
