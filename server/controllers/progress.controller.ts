import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  addProgress,
  deleteProgress,
  editProgress,
  getProgress,
  getProgressBySkill,
  getTimeSpent,
} from "../services/progress.service";

export const progressController = () => {
  const router = Router();

  router.post("/", authMiddleware, addProgress);
  router.get("/", authMiddleware, getProgress);
  router.delete("/:id", authMiddleware, deleteProgress);
  router.put("/:id", authMiddleware, editProgress);
  router.get("/time-spent", authMiddleware, getTimeSpent);
  router.get("/skill/:id", authMiddleware, getProgressBySkill);

  return router;
};
