import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  checkAuth,
  getUser,
  searchUsersToAdd,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/search-users").get(verifyJWT, searchUsersToAdd);

router.route("/check-auth").get(verifyJWT, checkAuth);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);
router.route("/:id").get(verifyJWT, getUser);

export default router;
