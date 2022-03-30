import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import corsOptions from "./config/corsOptions.js";
import mongoose from "mongoose";
import Authrouter from "./routes/auth.js";
import Privaterouter from "./routes/private.js";
import errorHandler from "./middleware/error.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import credentials from "./middleware/credentials.js";
import ErrorResponse from "./utils/errorResponse.js";
//app
const app = express();
//datbase connection
connectDB();

//Middleware

//logger
app.use(morgan("dev"));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));
// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// Connecting Routes
app.use("/api/auth", Authrouter);
app.use("/api/private", Privaterouter);

//404 route
app.all("*", (req, res, next) => {
  return next(new ErrorResponse("404 Not Found", 404));
});

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
