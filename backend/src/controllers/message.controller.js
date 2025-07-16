import { ApiError } from "../utils/ApiError.js";
import { Message } from "../models/message.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from "../models/conversation.models.js";

const newMessage = asyncHandler(async (req, res) => {
  const { body } = req.body;
  const { conversationId } = req.params;
  if (!body || !conversationId) {
    throw new ApiError(400, "Missing fields");
  }

  const existingConversation = await Conversation.findById(conversationId);
  if (
    !existingConversation ||
    !existingConversation.users.includes(req.user._id)
  ) {
    throw new ApiError(404, "Conversation not found!");
  }

  const message = await Message.create({
    body,
    sender: req.user._id,
    conversation: conversationId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, message, "Fetched Messages!"));
});

const getConversationMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const existingConversation = await Conversation.findById(conversationId);
  if (!existingConversation) throw new ApiError(404, "Conversation not found!");

  const isParticipant = existingConversation.users.some(
    (user) => user.toString() === req.user._id.toString()
  );
  if (!isParticipant) throw new ApiError(404, "Cannot access!");

  const messages = await Message.find({
    conversation: conversationId,
  }).sort({ createdAt: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Fetched Messages!"));
});

const deleteMessage = asyncHandler(async (req, res) => {});

const seenMessage = asyncHandler(async (req, res) => {});

export { newMessage, deleteMessage, getConversationMessages, seenMessage };
