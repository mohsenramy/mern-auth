import winston from "winston";
import { consoleFormat } from "winston-console-format";
import "winston-daily-rotate-file";
import util from "util";
import { URL } from "url";
import path from "path";

const { createLogger, format, transports, addColors } = winston;

const fileNames = {
  ERRORS: path.join("./", "backend", "logs", "%DATE%-errors.log"),
  ALL: path.join("./", "backend", "logs", "%DATE%-allLogs.log"),
};
// All options shared between transports
const fileDailyRotateConfig = {
  datePattern: "YYYYMMDD",
  maxSize: "1m",
  level: "error",
  handleExceptions: true,
  handleRejections: true,
};
// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  console.log(
    "🚀 ~ file: winstonLogger.js:40 ~ level ~ isDevelopment:",
    isDevelopment
  );
  return isDevelopment ? "debug" : "info";
};

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

addColors(colors);

const errorsTransport = new transports.DailyRotateFile({
  ...fileDailyRotateConfig,
  filename: fileNames.ERRORS,
});
const combinedTransport = new transports.DailyRotateFile({
  ...fileDailyRotateConfig,
  filename: fileNames.ALL,
});

const logger = createLogger({
  levels,
  level: level(), //: process.env.NODE_ENV !== "production" ? "debug" : "info",
  format: format.combine(
    // format.colorize(),
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    // format.ms(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "M!-AUTH" },
  transports: [errorsTransport, combinedTransport],
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      handleExceptions: true,
      handleRejections: true,
      format: format.combine(
        format.colorize({ all: true }),
        format.padLevels(),
        consoleFormat({
          showMeta: true,
          metaStrip: ["service"],
          inspectOptions: {
            depth: Infinity,
            colors: true,
            maxArrayLength: Infinity,
            breakLength: 120,
            compact: Infinity,
            sorted: true,
          },
        })
      ),
    })
  );
}
console.debug("\n\n\t\t\t ...APPLICATION STARTED/RESTARTED ...\n\n");
export default logger;

// logger.info("APP started/restarted");
// logger.silly("Logging initialized");
// logger.debug("Debug an object", {
//   yaya: "nothing --------------------",
//   make: "Ford",
//   model: "Mustang",
//   year: 1969,
// });
// logger.verbose("Returned value", { value: util.format });
// logger.info("Information", {
//   options: ["Lorem ipsum", "dolor sit amet"],
//   values: ["Donec augue eros, ultrices."],
// });
// logger.warn("Warning");
// logger.error(new Error("Unexpected error"));
