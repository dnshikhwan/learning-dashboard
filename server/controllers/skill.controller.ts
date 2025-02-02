import { Router } from "express";
import {
  addSkill,
  deleteSkill,
  getSkills,
  getSkillsById,
} from "../services/skill.service";
import { authMiddleware } from "../middlewares/auth.middleware";

export const skillController = () => {
  const router = Router();

  router.get("/", authMiddleware, getSkills);
  router.get("/:id", authMiddleware, getSkillsById);
  router.delete("/:id", authMiddleware, deleteSkill);
  router.post("/add", authMiddleware, addSkill);

  return router;
};
