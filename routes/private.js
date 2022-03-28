import { Router } from "express";
import protect from "../middleware/auth.js";
import { getPrivateRoute } from "../controllers/private.js";

const router = Router();

router.route("/").get(protect, getPrivateRoute);

export default router;
