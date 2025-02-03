import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";
import { client } from "../helpers/pg.helper";
import { IUser } from "../interfaces/user.interface";

export const addSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, target_date } = req.body;
    const user = req.user as IUser;

    if (!name || !description || !target_date) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredField
      );
    }

    const newSkill = await client.query(
      "insert into skills (user_id, name, description, target_date, status) values ($1, $2, $3, $4, $5) returning *",
      [user.id, name, description, target_date, "To do"]
    );

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.CREATED,
      APP_MESSAGE.skillSaved,
      {
        data: {
          skill: newSkill,
        },
      }
    );
  } catch (err) {
    next(err);
  }
};

export const updateSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user as IUser;
    const { name, description, target_date, status } = req.body;

    if (!name || !description || !target_date || !status) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredField
      );
    }

    const skillQuery = await client.query(
      "select * from skills where user_id = $1 and id = $2",
      [user.id, id]
    );

    if (skillQuery.rows.length === 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.NOT_FOUND,
        APP_MESSAGE.skillNotFound
      );
    }

    const updatedSkill = await client.query(
      "update skills set name = $1, description = $2, target_date = $3, status = $4 where user_id = $5 and id = $6 returning *",
      [name, description, target_date, status, user.id, id]
    );

    return sendResponse(
      res,
      false,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.skilLEdited,
      {
        data: {
          skill: updatedSkill,
        },
      }
    );
  } catch (err) {
    next(err);
  }
};

export const getSkills = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;

    const skills = await client.query(
      "select * from skills where user_id = $1",
      [user.id]
    );

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        skills: skills.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getSkillsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;
    const { id } = req.params;

    const skill = await client.query(
      "select * from skills where user_id = $1 and id = $2",
      [user.id, id]
    );

    if (skill.rows.length === 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.NOT_FOUND,
        APP_MESSAGE.skillNotFound
      );
    }

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        skill: skill.rows[0],
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;
    const { id } = req.params;

    const skill = await client.query(
      "select * from skills where user_id = $1 and id = $2",
      [user.id, id]
    );

    if (skill.rows.length === 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.NOT_FOUND,
        APP_MESSAGE.skillNotFound
      );
    }

    await client.query("delete from skills where user_id = $1 and id = $2", [
      user.id,
      id,
    ]);

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.skillDeleted
    );
  } catch (err) {
    next(err);
  }
};
