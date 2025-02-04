import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { addProgress, getTimeSpent } from "../services/progress.service";

export const progressController = () => {
  const router = Router();

  router.post("/", authMiddleware, addProgress);
  router.get("/time-spent", authMiddleware, getTimeSpent);

  return router;
};
