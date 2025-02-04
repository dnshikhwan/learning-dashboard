import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { addGoal, getGoalsBySkill } from "../services/goal.service";

export const goalController = () => {
  const router = Router();

  router.post("/", authMiddleware, addGoal);
  router.get("/:id", authMiddleware, getGoalsBySkill);

  return router;
};
