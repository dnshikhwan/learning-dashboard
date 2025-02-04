import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";
import { client } from "../helpers/pg.helper";

// TODO: add progress
export const addProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;
    const { skill_id, time_spent, notes } = req.body;

    if (!skill_id || !time_spent) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredField
      );
    }

    const newProgress = await client.query(
      "insert into progress (skill_id, user_id, time_spent, notes) values ($1, $2, $3, $4) returning * ",
      [skill_id, user.id, time_spent, notes]
    );

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.CREATED,
      APP_MESSAGE.progressSaved,
      {
        data: {
          progress: newProgress.rows,
        },
      }
    );
  } catch (err) {
    next(err);
  }
};

// TODO: edit progress

// TODO: delete progress

// TODO: get progress

// TODO: get total time
export const getTimeSpent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;

    const allProgress = await client.query(
      "select time_spent from progress where user_id = $1",
      [user.id]
    );

    // in hours
    let total_time_spent = 0;
    allProgress.rows.forEach((item) => {
      total_time_spent += item.time_spent;
    });

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        total_time_spent,
      },
    });
  } catch (err) {
    next(err);
  }
};
