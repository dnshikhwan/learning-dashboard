import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  editUsername,
  getCurrentUserProfile,
} from "../services/profile.service";

export const profileController = () => {
  const router = Router();

  router.get("/", authMiddleware, getCurrentUserProfile);
  router.put("/edit-username", authMiddleware, editUsername);

  return router;
};
