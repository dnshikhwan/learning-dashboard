import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getCredit } from "../services/credit.service";

export const creditController = () => {
  const router = Router();

  router.get("/", authMiddleware, getCredit);

  return router;
};
