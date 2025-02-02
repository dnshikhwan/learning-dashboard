import winston from "winston";
import { logLevels } from "../constants";

winston.addColors(logLevels.colors);

export const logger = winston.createLogger({
  levels: logLevels.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}] : ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});
