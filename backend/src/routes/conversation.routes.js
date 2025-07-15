import { Router } from "express";
import {
  leaveGroup,
  getConversation,
  newConversation,
  getConversations,
  addUser,
  removeUser,
  deleteConversation,
  createGroupConversation,
} from "../controllers/conversation.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getConversations);
router.route("/:id").get(verifyJWT, getConversation);
router.route("/:userId").post(verifyJWT, newConversation);
router.route("/:id").delete(verifyJWT, deleteConversation);

router.route("/:id/add-user").patch(verifyJWT, addUser);
router.route("/:id/leave").delete(verifyJWT, leaveGroup);
router.route("/:id/remove-user").patch(verifyJWT, removeUser);
router.route("/group").post(verifyJWT, createGroupConversation);

export default router;
