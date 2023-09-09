import express from "express";
import dotenv from "dotenv";
import logger from "./config/winstonLogger.js";

import httpLogger from "./middleware/httpLogger.middleware.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/errorHandlers.middleware.js";
import userRouter from "./routes/v1/user.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(httpLogger);
}
//#region ROUTERS
app.use("/api/v1/users", userRouter);
//#endregion

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`server is Running on PORT: ${PORT}`);
});
