import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";
import { client } from "../helpers/pg.helper";

export const addResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, url, skill_id, type, status } = req.body;
    const user = req.user as IUser;

    if (!title || !url || !skill_id || !type || !status) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredField
      );
    }

    const newResource = await client.query(
      "insert into resources (skill_id, user_id, title, url, type, status) values ($1, $2, $3, $4, $5, $6) returning *",
      [skill_id, user.id, title, url, type, status]
    );

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.CREATED,
      APP_MESSAGE.resourceSaved,
      {
        data: {
          resource: newResource,
        },
      }
    );
  } catch (err) {
    next(err);
  }
};

export const getResources = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;

    const resources = await client.query(
      "select resources.*, skills.name as skill_name from resources inner join skills on resources.skill_id = skills.id where resources.user_id = $1",
      [user.id]
    );

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: { resources: resources.rows },
    });
  } catch (err) {
    next(err);
  }
};

export const getResourceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user as IUser;

    const resource = await client.query(
      "select * from resources where id = $1 and user_id = $2",
      [id, user.id]
    );

    if (resource.rows.length === 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.NOT_FOUND,
        APP_MESSAGE.resourceNotFound
      );
    }

    const skill = await client.query(
      "select * from skills where id = $1 and user_id = $2",
      [resource.rows[0].skill_id, user.id]
    );

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        resource: resource.rows,
        skill: skill.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user as IUser;
    const { title, url, skill_id, type, status } = req.body;

    if (!title || !url || !skill_id || !type || !status) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredField
      );
    }

    await client.query(
      "update resources set title = $1, url = $2, skill_id = $3, type = $4, status = $5 where id = $6 and user_id = $7",
      [title, url, skill_id, type, status, id, user.id]
    );

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.resourceEdited
    );
  } catch (err) {
    next(err);
  }
};

export const deleteResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user as IUser;

    const resource = await client.query(
      "select * from resources where id = $1 and user_id = $2",
      [id, user.id]
    );

    if (resource.rows.length === 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.NOT_FOUND,
        APP_MESSAGE.resourceNotFound
      );
    }

    await client.query("delete from resources where id = $1 and user_id = $2", [
      id,
      user.id,
    ]);

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.resourceDeleted
    );
  } catch (err) {
    next(err);
  }
};
