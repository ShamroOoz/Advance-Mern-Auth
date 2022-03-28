import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import Authrouter from "./routes/auth.js";
import Privaterouter from "./routes/private.js";
import errorHandler from "./middleware/error.js";
//app
const app = express();
//datbase connection
connectDB();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Test Route
app.get("/", (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error("BROKEN");
    } catch (err) {
      next(err);
    }
  }, 100);
});

// Connecting Routes
app.use("/api/auth", Authrouter);
app.use("/api/private", Privaterouter);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
