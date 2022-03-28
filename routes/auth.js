import { Router } from "express";

const router = Router();

// Controllers
import {
  login,
  register,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.js";

router.route("/register").post(register);

router.route("/login").post(login);

// router.route("/forgotpassword").post(forgotPassword);

// router.route("/passwordreset/:resetToken").put(resetPassword);

export default router;
