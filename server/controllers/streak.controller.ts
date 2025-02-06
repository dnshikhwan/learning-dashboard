import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getStreak, updateStreak } from "../services/streak.service";

export const streakController = () => {
  const router = Router();

  router.get("/", authMiddleware, getStreak);
  router.put("/", authMiddleware, updateStreak);

  return router;
};
