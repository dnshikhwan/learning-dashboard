import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { client } from "../helpers/pg.helper";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";

// get credit
export const getCredit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;

    const credit = await client.query(
      "select * from credits where user_id = $1",
      [user.id]
    );

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        credit: credit.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

// update credit
export const updateCredit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;

    const creditQuery = await client.query(
      "select * from credits where user_id = $1",
      [user.id]
    );

    const totalCredit = creditQuery.rows[0].credit;

    await client.query("update credits set credit = $1 where user_id = $2", [
      totalCredit + 5,
      user.id,
    ]);
  } catch (err) {
    next(err);
  }
};
