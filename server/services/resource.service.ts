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

// TODO: update resource

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
