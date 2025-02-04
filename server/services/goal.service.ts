import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";
import { client } from "../helpers/pg.helper";
import { IUser } from "../interfaces/user.interface";

export const addGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skill_id, description, target_date, status } = req.body;
    const user = req.user as IUser;

    if (!skill_id || !description || !target_date || !status) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredField
      );
    }

    const newGoal = await client.query(
      "insert into goals (skill_id, user_id, description, target_date, status) values ($1, $2, $3, $4, $5) returning *",
      [skill_id, user.id, description, target_date, status]
    );

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.CREATED,
      APP_MESSAGE.goalSaved,
      {
        data: {
          goal: newGoal.rows,
        },
      }
    );
  } catch (err) {
    next(err);
  }
};

// TODO: edit goal

export const getGoalsBySkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user as IUser;

    const goals = await client.query(
      "select * from goals where skill_id = $1 and user_id = $2",
      [id, user.id]
    );

    if (goals.rows.length === 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.NOT_FOUND,
        APP_MESSAGE.goalNotFound
      );
    }

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        goals: goals.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

// TODO delete goal
