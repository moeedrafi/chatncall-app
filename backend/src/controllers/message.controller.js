import { ApiError } from "../utils/ApiError.js";
import { Message } from "../models/message.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const newMessage = asyncHandler(async (req, res) => {});

const getConversationMessages = asyncHandler(async (req, res) => {});

const deleteMessage = asyncHandler(async (req, res) => {});

const seenMessage = asyncHandler(async (req, res) => {});

export { newMessage, deleteMessage, getConversationMessages, seenMessage };
