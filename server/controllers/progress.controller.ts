import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  addProgress,
  deleteProgress,
  editProgress,
  getProgress,
  getProgressById,
  getProgressBySkill,
  getTimeSpent,
  getTimeSpentPerDay,
} from "../services/progress.service";

export const progressController = () => {
  const router = Router();

  router.post("/", authMiddleware, addProgress);
  router.get("/", authMiddleware, getProgress);
  router.get("/time-spent", authMiddleware, getTimeSpent);
  router.get("/per-day", authMiddleware, getTimeSpentPerDay);
  router.get("/:id", authMiddleware, getProgressById);
  router.delete("/:id", authMiddleware, deleteProgress);
  router.put("/:id", authMiddleware, editProgress);
  router.get("/skill/:id", authMiddleware, getProgressBySkill);

  return router;
};
