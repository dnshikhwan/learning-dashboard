import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { client } from "../helpers/pg.helper";
import { IStreak } from "../interfaces/streak.interface";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";

export const updateStreak = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;

    const streak_log = await client.query(
      "select * from streaks where user_id = $1",
      [user.id]
    );

    const streak = streak_log.rows[0] as IStreak;

    let current_streak = streak.current_streak;
    let longest_streak = streak.longest_streak;

    if (streak.last_activity_date === null) {
      current_streak = 1;
    }

    if (new Date().getDay() !== new Date(streak.last_activity_date).getDay()) {
      const dayDifference =
        (new Date().getTime() - new Date(streak.last_activity_date).getTime()) /
        (1000 * 60 * 60 * 24);

      if (dayDifference > 1) {
        longest_streak = current_streak;
        current_streak = 1;
      }

      if (dayDifference <= 1) {
        current_streak += 1;
        longest_streak = current_streak;
      }

      await client.query(
        "update streaks set current_streak = $1, last_activity_date = $2, longest_streak = $3 where user_id = $4",
        [current_streak, new Date(), longest_streak, user.id]
      );

      return sendResponse(
        res,
        true,
        HTTP_RESPONSE_CODE.OK,
        APP_MESSAGE.streakUpdated
      );
    }

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success);
  } catch (err) {
    next(err);
  }
};

export const getStreak = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;

    const streak_data = await client.query(
      "select * from streaks where user_id = $1",
      [user.id]
    );

    const streak = streak_data.rows[0] as IStreak;

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        current_streak: streak.current_streak,
        longest_streak: streak.longest_streak,
      },
    });
  } catch (err) {
    next(err);
  }
};
