import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from "../models/conversation.models.js";
import { FriendRequest } from "../models/friendRequest.models.js";
import { User } from "../models/user.models.js";

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

const newConversation = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const existingUser = await User.findById(userId);
  if (!existingUser || userId === req.user._id.toString()) {
    throw new ApiError(400, "Invalid user!");
  }

  const existingFriend = await FriendRequest.findOne({
    status: "accepted",
    $or: [
      { sender: req.user._id, receiver: userId },
      { sender: userId, receiver: req.user._id },
    ],
  });
  if (!existingFriend) {
    throw new ApiError(400, "Cannot start a convo before adding");
  }

  const existingConversation = await Conversation.findOne({
    isGroup: false,
    users: { $all: [req.user._id, userId], $size: 2 },
  }).lean();
  if (existingConversation) throw new ApiError(400, "Convo already exists");

  const conversation = await Conversation.create({
    isGroup: false,
    users: [req.user._id, userId],
  });

  const fullConversation = await Conversation.findById(conversation._id)
    .populate("users", "name avatar")
    .lean();

  return res
    .status(201)
    .json(new ApiResponse(201, fullConversation, "Conversation Created!"));
});

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
