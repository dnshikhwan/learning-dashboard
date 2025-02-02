import { NextFunction, Request, Response } from "express";
import { logger } from "../helpers/log.helper";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url } = req;

  res.on("finish", () => {
    const { statusCode } = res;

    if (statusCode && statusCode < 400) {
      logger.info(`${method} [${statusCode}]: ${url}`);
    }

    if (statusCode && statusCode >= 400 && statusCode <= 499) {
      logger.error(`${method} [${statusCode}]: ${url}`);
    }
  });
  next();
};
