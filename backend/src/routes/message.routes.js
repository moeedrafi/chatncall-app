import { Router } from "express";
import {
  deleteMessage,
  newMessage,
  seenMessage,
  seenByMessage,
  getConversationMessages,
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/:conversationId").post(verifyJWT, newMessage);
router.route("/:id").delete(verifyJWT, deleteMessage);
router.route("/:id/seen").post(verifyJWT, seenMessage);
router.route("/seen-by/:id").get(verifyJWT, seenByMessage);
router.route("/:conversationId").get(verifyJWT, getConversationMessages);

export default router;
