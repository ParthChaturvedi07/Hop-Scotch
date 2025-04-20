import rideModel from "../models/ride.model.js";
import { sendMessageToSocketId } from "../socket.js";
import * as mapsService from "./googlemaps.service.js";
import crypto from "crypto";

export const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapsService.getDistanceTime(pickup, destination);

  // console.log(distanceTime);

  // if (
  //   !distanceTime ||
  //   !distanceTime.distance ||
  //   !distanceTime.duration ||
  //   typeof distanceTime.distance.value !== "number" ||
  //   typeof distanceTime.duration.value !== "number"
  // ) {
  //   throw new Error("Invalid distance or duration data");
  // }

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };
  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };
  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  const fare = {
    auto:
      baseFare.auto +
      (distanceTime.distance.value / 1000) * perKmRate.auto +
      (distanceTime.duration.value / 60) * perMinuteRate.auto,
    car:
      baseFare.car +
      (distanceTime.distance.value / 1000) * perKmRate.car +
      (distanceTime.duration.value / 60) * perMinuteRate.car,
    motorcycle:
      baseFare.motorcycle +
      (distanceTime.distance.value / 1000) * perKmRate.motorcycle +
      (distanceTime.duration.value / 60) * perMinuteRate.motorcycle,
  };

  return fare;
};

const getOTP = (num) => {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
};

export const createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOTP(4),
    fare: fare[vehicleType],
  });

  return ride;
};

export const confirmRide = async (rideId, driverId) => {
  if (!rideId || !driverId) {
    throw new Error("Ride ID and Driver ID are required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      driver: driverId,
    }
  );

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("driver")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

export const startRide = async (rideId, otp) => {
  if (!rideId || !otp) {
    throw new Error("Ride ID and OTP are required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("driver")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted yet");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  return ride;
};

export const endRide = async (rideId, driverId) => {
  if (!rideId || !driverId) {
    throw new Error("Ride ID and Driver ID are required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      driver: driverId,
    })
    .populate("user")
    .populate("driver")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  return ride;
};
