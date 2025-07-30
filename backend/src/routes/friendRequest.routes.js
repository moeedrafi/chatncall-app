import { Router } from "express";
import {
  getRequests,
  acceptRequest,
  rejectRequest,
  getFriendsList,
  sendRequest,
  searchUsersForGroup,
} from "../controllers/friendRequest.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/requests").get(verifyJWT, getRequests);
router.route("/:id/add").post(verifyJWT, sendRequest);
router.route("/:id/accept").post(verifyJWT, acceptRequest);
router.route("/friends").get(verifyJWT, getFriendsList);
router.route("/:id/reject").delete(verifyJWT, rejectRequest);
router.route("/add-group").post(verifyJWT, searchUsersForGroup);

export default router;
