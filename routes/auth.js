import { Router } from "express";

const router = Router();

// Controllers
import {
  login,
  register,
  Logout,
  forgotPassword,
  resetPassword,
  handleRefreshToken,
} from "../controllers/auth.js";

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(Logout);

router.route("/refresh").get(handleRefreshToken);

router.route("/forgotpassword").post(forgotPassword);

router.route("/passwordreset/:resetToken").put(resetPassword);

export default router;
