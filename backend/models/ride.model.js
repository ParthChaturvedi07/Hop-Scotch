import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
  duration: {
    type: Number,
  }, // in seconds
  distance: {
    type: Number,
  }, // in meters
  paymentID: {
    type: String,
  },
  orderID: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp: {
    type: String,
    select: false,
    required: true,
  },
});

export default mongoose.model("ride", rideSchema);
