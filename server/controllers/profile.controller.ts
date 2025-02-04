import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getCurrentUserProfile } from "../services/profile.service";

export const profileController = () => {
  const router = Router();

  router.get("/", authMiddleware, getCurrentUserProfile);

  return router;
};
