import { Router } from "express";
import { testController } from "../controllers/test.controller";
import { authController } from "../controllers/auth.controller";
import { skillController } from "../controllers/skill.controller";
import { resourceController } from "../controllers/resource.controller";
import { profileController } from "../controllers/profile.controller";
import { goalController } from "../controllers/goal.controller";
import { progressController } from "../controllers/progress.controller";

export const createRouter = () => {
  const router = Router();

  router.use("/test", testController());
  router.use("/auth", authController());
  router.use("/skills", skillController());
  router.use("/resources", resourceController());
  router.use("/profile", profileController());
  router.use("/goals", goalController());
  router.use("/progress", progressController());

  return router;
};
