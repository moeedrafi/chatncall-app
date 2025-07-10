import { Router } from "express";
import {
  leaveGroup,
  getConversation,
  newConversation,
  getConversations,
  deleteConversation,
} from "../controllers/conversation.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getConversations);
router.route("/").post(verifyJWT, newConversation);
router.route("/:id").get(verifyJWT, getConversation);
router.route("/:id/leave").delete(verifyJWT, leaveGroup);
router.route("/:id").delete(verifyJWT, deleteConversation);

export default router;
