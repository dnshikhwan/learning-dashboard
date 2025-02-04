import { Router } from "express";
import {
  addSkill,
  deleteSkill,
  getCompletedSkill,
  getLearningSkill,
  getSkills,
  getSkillsById,
  updateSkill,
} from "../services/skill.service";
import { authMiddleware } from "../middlewares/auth.middleware";

export const skillController = () => {
  const router = Router();

  router.get("/learning", authMiddleware, getLearningSkill);
  router.get("/completed", authMiddleware, getCompletedSkill);
  router.get("/", authMiddleware, getSkills);
  router.get("/:id", authMiddleware, getSkillsById);
  router.delete("/:id", authMiddleware, deleteSkill);
  router.put("/:id", authMiddleware, updateSkill);
  router.post("/add", authMiddleware, addSkill);

  return router;
};
