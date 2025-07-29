import { ApiError } from "../utils/ApiError.js";
import { Message } from "../models/message.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from "../models/conversation.models.js";

const newMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { conversationId } = req.params;
  if (!message) throw new ApiError(400, "Missing fields");
  if (!conversationId) throw new ApiError(400, "Missing conversationId");

  const existingConversation = await Conversation.findById(conversationId);
  if (
    !existingConversation ||
    !existingConversation.users.includes(req.user._id)
  ) {
    throw new ApiError(404, "Conversation not found!");
  }

  const newMessage = await Message.create({
    body: message,
    sender: req.user._id,
    conversation: conversationId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newMessage, "Message Sent!"));
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

const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) throw new ApiError(404, "Message not found!");

  if (message.sender.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "Cannot delete someone else message");
  }

  await Message.findByIdAndDelete(id);

  return res.status(200).json(new ApiResponse(200, {}, "Deleted Message!"));
});

const seenMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) throw new ApiError(404, "Message not found!");

  const alreadySeen = message.seenBy.some(
    (user) => user.toString() === req.user._id.toString()
  );
  if (!alreadySeen) {
    message.seenBy.push(req.user._id);
    await message.save();
  }

  return res.status(200).json(new ApiResponse(200, message, "Marked as Seen!"));
});

const seenByMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const message = await Message.findById(id).populate(
    "seenBy",
    "username avatar"
  );
  if (!message) throw new ApiError(404, "Message not found!");

  if (message.sender.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "Cannot see seen list of someone else message");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, message.seenBy, "Seen List!"));
});

export {
  newMessage,
  deleteMessage,
  getConversationMessages,
  seenMessage,
  seenByMessage,
};
