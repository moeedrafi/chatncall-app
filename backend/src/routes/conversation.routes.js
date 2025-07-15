import { Router } from "express";
import {
  leaveGroup,
  getConversation,
  newConversation,
  getConversations,
  addUser,
  removeUser,
  deleteConversation,
} from "../controllers/conversation.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getConversations);
router.route("/:userId").post(verifyJWT, newConversation);
router.route("/:id").get(verifyJWT, getConversation);
router.route("/:id/leave").delete(verifyJWT, leaveGroup);
router.route("/:id").delete(verifyJWT, deleteConversation);

router.route("/:id/add-user").patch(verifyJWT, addUser);
router.route("/:id/remove-user").patch(verifyJWT, removeUser);

export default router;
