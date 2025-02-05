import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";
import { client } from "../helpers/pg.helper";

export const addProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;
    const { skill_id, time_spent, notes, date } = req.body;

    if (!skill_id || !time_spent) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredField
      );
    }

    let newProgress;
    if (date) {
      newProgress = await client.query(
        "insert into progress (skill_id, user_id, time_spent, notes, date) values ($1, $2, $3, $4, $5) returning * ",
        [skill_id, user.id, time_spent, notes, date]
      );
    } else {
      newProgress = await client.query(
        "insert into progress (skill_id, user_id, time_spent, notes) values ($1, $2, $3, $4) returning * ",
        [skill_id, user.id, time_spent, notes]
      );
    }

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

export const editProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;
    const { id } = req.params;
    const { time_spent, notes } = req.body;

    if (!time_spent) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredField
      );
    }

    await client.query(
      "update progress set time_spent = $1, notes = $2 where id = $3 and user_id = $4",
      [time_spent, notes, id, user.id]
    );

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.progressEdited
    );
  } catch (err) {
    next(err);
  }
};

export const deleteProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user as IUser;

    const progress = await client.query(
      "select * from progress where id = $1 and user_id = $2",
      [id, user.id]
    );

    if (progress.rows.length === 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.NOT_FOUND,
        APP_MESSAGE.progressNotFound
      );
    }

    await client.query("delete from progress where id = $1 and user_id = $2", [
      id,
      user.id,
    ]);

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.progressDeleted
    );
  } catch (err) {
    next(err);
  }
};

export const getProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;

    const progress = await client.query(
      "select * from progress where user_id = $1",
      [user.id]
    );

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        progress: progress.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getProgressById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user as IUser;

    const progress = await client.query(
      "select * from progress where id = $1 and user_id = $2",
      [id, user.id]
    );

    if (progress.rows.length === 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.NOT_FOUND,
        APP_MESSAGE.progressNotFound
      );
    }

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        progress: progress.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getProgressBySkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user as IUser;

    const progress = await client.query(
      "select * from progress where skill_id = $1 and user_id = $2",
      [id, user.id]
    );

    if (progress.rows.length === 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.NOT_FOUND,
        APP_MESSAGE.progressNotFound
      );
    }

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        progress: progress.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

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
