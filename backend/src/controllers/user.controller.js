import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {});

const loginUser = asyncHandler(async (req, res) => {});

const logoutUser = asyncHandler(async (req, res) => {});

const refreshAccessToken = asyncHandler(async (req, res) => {});

const checkAuth = asyncHandler(async (req, res) => {});

const searchUser = asyncHandler(async (req, res) => {});

const getUser = asyncHandler(async (req, res) => {});

export {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  searchUser,
  checkAuth,
  refreshAccessToken,
};
