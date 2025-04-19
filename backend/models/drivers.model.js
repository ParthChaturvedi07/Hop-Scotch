import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const driverSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least three characters long"],
    },
    lastName: {
      type: String,
      minlength: [3, "Last name must be at least three characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least three characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least three characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },

  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

driverSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

driverSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

driverSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

export default mongoose.model("driver", driverSchema);
