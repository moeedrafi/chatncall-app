import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { FriendRequest } from "../models/friendRequest.models.js";

const getRequests = asyncHandler(async (req, res) => {});

const getFriendsList = asyncHandler(async (req, res) => {});

const sendRequest = asyncHandler(async (req, res) => {});

const acceptRequest = asyncHandler(async (req, res) => {});

const rejectRequest = asyncHandler(async (req, res) => {});

const searchUsersToAdd = asyncHandler(async (req, res) => {});

export {
  getRequests,
  sendRequest,
  acceptRequest,
  rejectRequest,
  getFriendsList,
  searchUsersToAdd,
};
