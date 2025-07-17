import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { FriendRequest } from "../models/friendRequest.models.js";

const getRequests = asyncHandler(async (req, res) => {
  const receivedRequests = await FriendRequest.find({
    receiver: req.user._id,
    status: "pending",
  })
    .populate("sender", "username email avatar")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, receivedRequests, "Friend Requests Received!"));
});

const getFriendsList = asyncHandler(async (req, res) => {
  const friendRequests = await FriendRequest.find({
    status: "accepted",
    $or: [{ receiver: req.user._id }, { sender: req.user._id }],
  })
    .populate("sender", "username avatar email")
    .populate("receiver", "username avatar email");

  const friends = friendRequests.map((request) =>
    request.sender._id.toString() === req.user._id.toString()
      ? request.receiver
      : request.sender
  );

  return res.status(200).json(new ApiResponse(200, friends, "Friends List!"));
});

const sendRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingUser = await User.findById(id);
  if (!existingUser) throw new ApiError(404, "User not found!");

  if (req.user._id.toString() === id) {
    throw new ApiError(404, "Cannot send to yourself!");
  }

  const existingRequest = await FriendRequest.findOne({
    $or: [
      { receiver: id, sender: req.user._id },
      { sender: id, receiver: req.user._id },
    ],
  });
  if (existingRequest) {
    if (existingRequest.status === "pending") {
      throw new ApiError(404, "Friend request already exists");
    }

    if (existingRequest.status === "accepted") {
      throw new ApiError(404, "You are already friends");
    }

    if (existingRequest.status === "rejected") {
      existingRequest.status = "pending";
      existingRequest.sender = req.user._id;
      existingRequest.receiver = id;
      await existingRequest.save();

      return res
        .status(200)
        .json(new ApiResponse(200, existingRequest, "Friend request re-sent!"));
    }
  }

  const newRequest = await FriendRequest.create({
    status: "pending",
    sender: req.user._id,
    receiver: id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newRequest, "Friend Requset Sent!"));
});

const acceptRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user._id.toString() === id) {
    throw new ApiError(404, "Cannot send to yourself!");
  }

  const existingUser = await User.findById(id);
  if (!existingUser) throw new ApiError(404, "User not found!");

  const existingRequest = await FriendRequest.findOne({
    status: "pending",
    sender: id,
    receiver: req.user._id,
  });
  if (!existingRequest || existingRequest.status !== "pending") {
    throw new ApiError(400, "No pending friend request found");
  }

  existingRequest.status = "accepted";
  await existingRequest.save();

  return res
    .status(200)
    .json(new ApiResponse(200, existingRequest, "Friend Requset Accepted!"));
});

const rejectRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingUser = await User.findById(id);
  if (!existingUser) throw new ApiError(404, "User not found!");

  const existingRequest = await FriendRequest.findOne({
    status: "pending",
    sender: id,
    receiver: req.user._id,
  });
  if (!existingRequest || existingRequest.status !== "pending") {
    throw new ApiError(400, "No pending friend request found");
  }

  existingRequest.status = "rejected";
  await existingRequest.save();

  return res
    .status(200)
    .json(new ApiResponse(200, existingRequest, "Friend Request Rejected!"));
});

const searchUsersToAdd = asyncHandler(async (req, res) => {
  const { username } = req.query;

  const users = await User.findOne({
    username: { $regex: username, $options: "i" },
    _id: { $ne: req.user._id },
  }).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Search successful!"));
});

export {
  getRequests,
  sendRequest,
  acceptRequest,
  rejectRequest,
  getFriendsList,
  searchUsersToAdd,
};
