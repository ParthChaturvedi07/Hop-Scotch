import mongoose from "mongoose";
import "dotenv/config.js";

const DB_URI = (process.env.NODE_ENV === "development"
  ? process.env.DB_CONNECT_ATLAS
  : process.env.DB_CONNECT_LOCAL);

const connectToDb = () => {
  mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`Connected to MongoDB (${process.env.NODE_ENV})...`);
    })
    .catch((err) => console.error(err));
};

export default connectToDb;
