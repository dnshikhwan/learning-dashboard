import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers/response.helper";
import { HTTP_RESPONSE_CODE } from "../constants";

export const checkHealth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, "ok");
  } catch (err) {
    next(err);
  }
};
