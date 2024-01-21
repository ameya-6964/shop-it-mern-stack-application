import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });

// Create an instance of the Express application
const app = express();

app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
