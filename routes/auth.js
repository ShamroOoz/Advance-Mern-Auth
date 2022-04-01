import { Router } from "express";

const router = Router();

// Controllers
import {
  login,
  register,
  verifyUser,
  resendVerifyEmail,
  Logout,
  forgotPassword,
  resetPassword,
  handleRefreshToken,
} from "../controllers/auth.js";

router.route("/register").post(register);

router.route("/verified-email/:resetToken").get(verifyUser);

router.route("/resend-verify-email").post(resendVerifyEmail);

router.route("/login").post(login);

router.route("/logout").get(Logout);

router.route("/refresh").get(handleRefreshToken);

router.route("/forgotpassword").post(forgotPassword);

router.route("/passwordreset/:resetToken").put(resetPassword);

export default router;
