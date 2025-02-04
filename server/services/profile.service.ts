import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { client } from "../helpers/pg.helper";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";

export const getCurrentUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;

    const userData = await client.query("select * from users where id = $1", [
      user.id,
    ]);

    if (userData.rows.length === 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.NOT_FOUND,
        APP_MESSAGE.userNotFound
      );
    }

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        user: userData.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};
