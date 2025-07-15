import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from "../models/conversation.models.js";

const getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    users: req.user._id,
  })
    .populate("users", "name email avatar")
    .sort({ lastMessageAt: -1 })
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, conversations, "All Conversations!"));
});

const getConversation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const conversation = await Conversation.findById(id)
    .populate("users", "name email avatar")
    .lean();
  if (!conversation) throw new ApiError(404, "Conversation not found");

  const isParticipant = conversation.users.some(
    (user) => user._id.toString() !== req.user._id.toString()
  );
  if (!isParticipant) throw new ApiError(403, "Not authorized");

  return res
    .status(200)
    .json(new ApiResponse(200, conversation, "Fetched Conversation!"));
});

const newConversation = asyncHandler(async (req, res) => {});

const deleteConversation = asyncHandler(async (req, res) => {});

const leaveGroup = asyncHandler(async (req, res) => {});

const addUser = asyncHandler(async (req, res) => {});
const removeUser = asyncHandler(async (req, res) => {});

export {
  getConversations,
  getConversation,
  deleteConversation,
  leaveGroup,
  addUser,
  removeUser,
  newConversation,
};
