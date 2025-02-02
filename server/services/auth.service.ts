import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";
import { client } from "../helpers/pg.helper";
import { IUser } from "../interfaces/user.interface";
import { configs, cookieOptions } from "../configs";
import { sendMail } from "../helpers/sendMail.helper";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredField
      );
    }

    if (password !== confirmPassword) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.passwordsMismatch
      );
    }

    const usernameExists = await client.query(
      "select * from users where username = $1",
      [username]
    );

    if (usernameExists.rows.length !== 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.CONFLICT,
        APP_MESSAGE.usernameDuplicated
      );
    }

    const emailExists = await client.query(
      "select * from users where email = $1",
      [email]
    );

    if (emailExists.rows.length !== 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.CONFLICT,
        APP_MESSAGE.emailDuplicated
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await client.query(
      "insert into users (username, email, password_hash) values ($1, $2, $3) returning * ",
      [username, email, hashedPassword]
    );

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.userRegistered,
      {
        data: {
          user: newUser.rows[0],
        },
      }
    );
  } catch (err) {
    next(err);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredField
      );
    }

    const result = await client.query("select * from users where email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return sendResponse(
        res,
        true,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.invalidCredentials
      );
    }

    const user = result.rows[0] as IUser;

    const decryptedPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!decryptedPassword) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.invalidCredentials
      );
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      configs.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("accessToken", accessToken, cookieOptions);

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.userLoggedIn,
      {
        data: {
          username: user.username,
          email: user.email,
          accessToken,
        },
      }
    );
  } catch (err) {
    next(err);
  }
};

export const sendResetPasswordLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // flow, user enter email, check in db if exists, store token in db, send user link with that token
  // user click, then check if the token and user match, save the new password in db
  try {
    const { email } = req.body;

    if (!email) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredField
      );
    }

    const result = await client.query("select * from users where email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return sendResponse(
        res,
        true,
        HTTP_RESPONSE_CODE.OK,
        APP_MESSAGE.passwordResetEmail
      );
    }

    const user = result.rows[0] as IUser;

    const resetPasswordToken = jwt.sign(
      {
        email: user.email,
      },
      configs.JWT_SECRET_KEY,
      {
        expiresIn: "10m",
      }
    );

    await client.query(
      "insert into reset_tokens (user_id, token) values ($1, $2)",
      [user.id, resetPasswordToken]
    );

    const resetLink = `http://localhost:5000/api/auth/reset-password/${resetPasswordToken}`;
    await sendMail(user, "Reset password link", resetLink);

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.passwordResetEmail
    );
  } catch (err) {
    next(err);
  }
};

export const verifyResetToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;

    if (!token) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.invalidToken
      );
    }

    const tokenRecord = await client.query(
      "select * from reset_tokens where token = $1 and expires_at > NOW()",
      [token]
    );

    if (tokenRecord.rows.length === 0) {
      return res.redirect(
        `http://localhost:5173/auth/reset-password/${token}?error=tokenError`
      );
    }

    return res.redirect(`http://localhost:5173/auth/reset-password/${token}`);
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredField
      );
    }

    const tokenRecord = await client.query(
      "select * from reset_tokens where token = $1 and expires_at > NOW()",
      [token]
    );

    if (tokenRecord.rows.length === 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.invalidToken,
        {
          redirectUrl: `/auth/reset-password/${token}?error=tokenError`,
        }
      );
    }

    if (newPassword !== confirmPassword) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.passwordsMismatch
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await client.query("update users set password_hash = $1 where id = $2", [
      hashedPassword,
      tokenRecord.rows[0].user_id,
    ]);

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.passwordResetSuccessful
    );
  } catch (err) {
    next(err);
  }
};
