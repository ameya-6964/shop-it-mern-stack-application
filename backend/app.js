import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/error.js";

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught expection");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

//Connecting To Database
connectDatabase();

// Create an instance of the Express application
const app = express();

/* 
used to parse incoming requests with JSON payloads. It is a middleware function that adds the ability to parse JSON data to the Express application.
 */
app.use(express.json());

// Import all routes
import productRoutes from "./routes/products.js";
app.use("/api/v1", productRoutes);

//Using Error Middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
