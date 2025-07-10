import { Router } from "express";
import {
  deleteMessage,
  newMessage,
  seenMessage,
  getConversationMessages,
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, newMessage);
router.route("/:id").delete(verifyJWT, deleteMessage);
router.route("/:id/seen").post(verifyJWT, seenMessage);
router.route("/:conversationId").get(verifyJWT, getConversationMessages);

export default router;
