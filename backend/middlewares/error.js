// Global error handler middleware
import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  // Initialize the error object with default values
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };

  // Handle Invalid Mongoose ID Error
  if (err.name === "CastError") {
    // If the error is a Mongoose CastError, create a new error with a specific message and status code
    const message = `Resource not found. Invalid: ${err?.path}`;
    error = new ErrorHandler(message, 404);
  }

  // Handle Validation Error
  if (err.name === "ValidationError") {
    // If the error is a Mongoose ValidationError, extract error messages and set a new status code
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  // Respond with error details based on the environment

  // In development environment, provide detailed error information including the error object and stack trace
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack,
    });
  }

  // In production environment, provide a simplified response with only the error message
  if (process.env.NODE_ENV === "PRODUCTION") {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
};
