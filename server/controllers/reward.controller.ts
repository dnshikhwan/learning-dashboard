import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  claimReward,
  getRewards,
  getUserReward,
} from "../services/reward.service";

export const rewardController = () => {
  const router = Router();

  router.get("/", authMiddleware, getRewards);
  router.get("/claimed", authMiddleware, getUserReward);
  router.post("/:id", authMiddleware, claimReward);

  return router;
};
