import { NextFunction, Request, Response } from "express";
import { client } from "../helpers/pg.helper";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";
import { IUser } from "../interfaces/user.interface";

export const getRewards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rewards = await client.query("select * from rewards");

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        rewards: rewards.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getUserReward = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;

    const userReward = await client.query(
      "select * from users_rewards where user_id = $1",
      [user.id]
    );

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        userReward: userReward.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const claimReward = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;
    const { id } = req.params;

    const credits = await client.query(
      "select credit from credits where user_id = $1",
      [user.id]
    );

    const current_credit = credits.rows[0].credit;

    const reward = await client.query(
      "select credit from rewards where id = $1",
      [id]
    );
    const required_credit = reward.rows[0].credit;

    if (current_credit < required_credit) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.insufficientCredit
      );
    }

    const remaining_credit = current_credit - required_credit;

    await client.query("update credits set credit = $1 where user_id = $2", [
      remaining_credit,
      user.id,
    ]);

    await client.query(
      "insert into users_rewards (user_id, reward_id) values ($1, $2)",
      [user.id, id]
    );

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.rewardsClaimed
    );
  } catch (err) {
    next(err);
  }
};
