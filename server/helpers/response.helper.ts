import { Response } from "express";

interface responseFormat {
  success: boolean;
  code: number;
  message: string;
  details?: any;
}

export const sendResponse = (
  res: Response,
  success: boolean,
  code: number,
  message: string,
  details?: any
) => {
  const response: responseFormat = {
    success,
    code,
    message,
    details,
  };

  res.status(code).send(response);
};
