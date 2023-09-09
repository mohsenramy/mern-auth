import logger from "../config/winstonLogger.js";

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found [${req.originalUrl}]`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  logger.error(err);
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message;

  // If Mongoose not found error
  if ((err.name = "CastError" && err.kind === "ObjectId")) {
    (statusCode = 404), (message = "Resource not found");
  }

  res.status(statusCode).json({
    status: "FAILED",
    message: message,
    stack: process.env.NODE_ENV !== "production" ? err.stack : null,
  });
  next();
};

export { notFoundHandler, errorHandler };
