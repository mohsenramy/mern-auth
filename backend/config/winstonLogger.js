import winston from "winston";
import { consoleFormat } from "winston-console-format";
import "winston-daily-rotate-file";
import util from "util";
import { URL } from "url";
import path from "path";

const { createLogger, format, transports } = winston;

const fileNames = {
  ERRORS: path.join("./", "backend", "logs", "%DATE%-errors.log"),
  ALL: path.join("./", "backend", "logs", "%DATE%-allLogs.log"),
};
// All options shared between transports
const fileDailyRotateCommonOptions = {
  datePattern: "YYYYMMDD",
  maxSize: "1m",
  level: "error",
  handleExceptions: true,
  handleRejections: true,
};

const errorsTransport = new transports.DailyRotateFile({
  ...fileDailyRotateCommonOptions,
  filename: fileNames.ERRORS,
});
const combinedTransport = new transports.DailyRotateFile({
  ...fileDailyRotateCommonOptions,
  filename: fileNames.ALL,
});

const logger = createLogger({
  level: process.env.NODE_ENV !== "production" ? "debug" : "info",
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
