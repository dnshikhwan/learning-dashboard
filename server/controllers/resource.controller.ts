import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { addResource, getResources } from "../services/resource.service";

export const resourceController = () => {
  const router = Router();

  router.get("/", authMiddleware, getResources);
  router.post("/", authMiddleware, addResource);

  return router;
};
