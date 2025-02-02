import { Router } from "express";
import {
  resetPassword,
  sendResetPasswordLink,
  signIn,
  signUp,
  verifyResetToken,
} from "../services/auth.service";

export const authController = () => {
  const router = Router();

  router.post("/signup", signUp);
  router.post("/signin", signIn);
  router.post("/request-reset", sendResetPasswordLink);
  router.post("/reset-password", resetPassword);
  router.get("/reset-password/:token", verifyResetToken);

  return router;
};
