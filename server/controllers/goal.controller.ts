import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { addGoal, deleteGoal, getGoalsBySkill } from "../services/goal.service";

export const goalController = () => {
  const router = Router();

  router.post("/", authMiddleware, addGoal);
  router.get("/:id", authMiddleware, getGoalsBySkill);
  router.delete("/:id", authMiddleware, deleteGoal);

  return router;
};
