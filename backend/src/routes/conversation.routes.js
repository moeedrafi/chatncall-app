import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/conversation.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, registerUser);
router.route("/").post(verifyJWT, loginUser);
router.route("/").delete(verifyJWT, logoutUser);

export default router;
