import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  addResource,
  deleteResource,
  getResourceById,
  getResources,
  updateResource,
} from "../services/resource.service";

export const resourceController = () => {
  const router = Router();

  router.delete("/:id", authMiddleware, deleteResource);
  router.get("/:id", authMiddleware, getResourceById);
  router.put("/:id", authMiddleware, updateResource);
  router.get("/", authMiddleware, getResources);
  router.post("/", authMiddleware, addResource);

  return router;
};
