import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";

//app
const app = express();
//datbase connection
connectDB();

//Middleware
app.use(express.json());

//Test Route
app.get("/", (req, res, next) => {
  res.send("Api running");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
