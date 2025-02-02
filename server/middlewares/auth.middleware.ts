import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { configs } from "../configs";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;

    try {
      const decoded = jwt.verify(accessToken, configs.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        return sendResponse(
          res,
          false,
          HTTP_RESPONSE_CODE.UNAUTHORIZED,
          APP_MESSAGE.invalidToken
        );
      }
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.UNAUTHORIZED,
        APP_MESSAGE.userUnauthorized
      );
    }
  } catch (err) {
    next(err);
  }
};
