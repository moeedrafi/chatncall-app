import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/friendRequest.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, registerUser);
router.route("/add").post(verifyJWT, loginUser);
router.route("/reject").delete(verifyJWT, logoutUser);

export default router;
