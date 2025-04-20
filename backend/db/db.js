import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });


const DB_URI =
  process.env.NODE_ENV === "development"
    ? process.env.DB_CONNECT_LOCAL
    : process.env.DB_CONNECT_ATLAS;

console.log("NODE_ENV:", process.env.NODE_ENV);

console.log(DB_URI);

const connectToDb = () => {
  mongoose
    .connect(DB_URI, { useNewUrlParser: true })
    .then(() => {
      console.log(`Connected to MongoDB (${process.env.NODE_ENV})...`);
    })
    .catch((err) => console.error(err));
};

export default connectToDb;
