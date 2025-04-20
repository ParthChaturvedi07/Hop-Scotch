import express from "express";
const app = express();
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDb from "./db/db.js";
import "dotenv/config.js";
connectToDb();

// Routes
import userRoutes from "./routes/user.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import mapRoutes from "./routes/googlemaps.routes.js";
import rideRoutes from "./routes/ride.routes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", userRoutes);
app.use("/drivers", driverRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);

export default app;
