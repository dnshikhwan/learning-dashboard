import { NextFunction, Request, Response } from "express";
import { APP_MESSAGE } from "../constants";
import { logger } from "./log.helper";
import { sendResponse } from "./response.helper";

class HttpException extends Error {
  status: number;
  error: {};

  constructor(message: string, status: number, error?: {}) {
    super(message);
    this.status = status;
    this.error = error || {};
  }
}

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status_code = error.status ? error.status : 500;
  const error_message =
    status_code === 500 ? APP_MESSAGE.serverError : error.message;
  const errors = error.error;

  logger.error(error_message);
  return sendResponse(res, false, status_code, error_message, { errors });
};
