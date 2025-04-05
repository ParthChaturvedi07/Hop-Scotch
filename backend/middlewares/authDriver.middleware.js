import driversModel from "../models/drivers.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import jwt from "jsonwebtoken";

export const authDriver = async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await blacklistTokenModel.findOne({ token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const driver = await driversModel.findById(decoded._id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    req.driver = driver;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
