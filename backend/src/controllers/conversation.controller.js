import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from "../models/conversation.models.js";

const getConversations = asyncHandler(async (req, res) => {});

const getConversation = asyncHandler(async (req, res) => {});

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
