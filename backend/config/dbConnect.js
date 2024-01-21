import mongoose from "mongoose";

export const connectDatabase = () => {
  let DB_URI = "";

  // Check the environment and set the database URI accordingly
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    DB_URI = process.env.DB_LOCAL_URI; // Local database URI
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    DB_URI = process.env.DB_URI; // Production database URI
  }

  // Connect to the database
  mongoose
    .connect(DB_URI)
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con?.connection?.host}`
      );
    })
    .catch((error) => {
      console.error(error);
    });
};
