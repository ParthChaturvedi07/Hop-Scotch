import * as mapsService from "../services/googlemaps.service.js";
import { validationResult } from "express-validator";

export const getCoordinates = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapsService.getAddressCoordinates(address);
    res.status(200).json({ coordinates });
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    res.status(500).json({ message: "Error fetching coordinates" });
  }
};

export const getDistanceTime = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { origin, destination } = req.query;

    const distanceTime = await mapsService.getDistanceTime(origin, destination);
    res.status(200).json({ distanceTime });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAutoCompleteSuggestions = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { input } = req.query;

    const suggestions = await mapsService.getAutoCompleteSuggestions(input);
    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
