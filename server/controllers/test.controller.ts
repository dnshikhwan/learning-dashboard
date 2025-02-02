import { NextFunction, Request, Response, Router } from "express";
import { checkHealth } from "../services/test.service";

export const testController = () => {
  const router = Router();

  router.get("/health", (req: Request, res: Response, next: NextFunction) => {
    checkHealth(req, res, next);
  });

  return router;
};
