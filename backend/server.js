import express from "express";
import dotenv from "dotenv";
import logger from "./config/winstonLogger.js";

import httpLogger from "./middleware/httpLogger.middleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());
app.use(httpLogger);
if (process.env.NODE_ENV === "development") {
}

app.get("/error", function (req, res, next) {
  // here we cause an error in the pipeline so we see express-winston in action.
  return next(
    new Error("This is an error and it should be logged to the console")
  );
});

app.post("/", (req, res) => {
  throw new Error("TESTING .............");
  return res
    .status(200)
    .json({ message: "SERVER IS READY", data: { email: req?.body?.email } });
});

app.use((err, req, res, next) => {
  logger.error(err);
  res
    .status(err?.status || 500)
    .json({ status: "FAILED", message: err.message });
  next();
});

app.listen(PORT, () => {
  logger.info(`server is Running on PORT: ${PORT}`);
});
