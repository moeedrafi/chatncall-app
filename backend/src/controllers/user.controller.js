import { OPTIONS } from "../constants.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong during access and refresh tokens!"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    throw new ApiError(400, "Missing fields!");

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User already exists!");

  const user = await User.create({ email, username, password });
  const { accessToken } = generateAccessAndRefreshToken(user._id);

  const {
    passowrd: _,
    refreshToken: __,
    ...userWithoutSensitiveFields
  } = user.toObject();

  return res
    .status(201)
    .cookie("accessToken", accessToken, OPTIONS)
    .json(
      new ApiResponse(
        201,
        userWithoutSensitiveFields,
        "User Created Successfully!"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Missing fields!");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "User not exists!");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken } = await generateAccessAndRefreshToken(user._id);

  const {
    password: _,
    refreshToken: __,
    ...userWithoutSensitiveFields
  } = user.toObject();

  return res
    .status(200)
    .cookie("accessToken", accessToken, OPTIONS)
    .json(
      new ApiResponse(
        200,
        userWithoutSensitiveFields,
        "User Logged in Successfully!"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: "" } },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", OPTIONS)
    .clearCookie("refreshToken", OPTIONS)
    .json(new ApiResponse(200, {}, "User Logged Out!"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = await User.findById(req.user._id);
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Access!");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(user._id);
    if (!user) throw new ApiError(401, "Invalid Refresh Token!");

    if (incomingRefreshToken !== user.refreshToken)
      throw new ApiError(401, "Refresh Token Expired!");

    const { accessToken } = await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, OPTIONS)
      .json(new ApiResponse(200, user, "Token Refreshed!"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Token!");
  }
});

const checkAuth = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Invalid Token!");

  try {
    const { accessToken } = await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, OPTIONS)
      .json(new ApiResponse(200, user, "Token Verified!"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Token!");
  }
});

const getUser = asyncHandler(async (req, res) => {});

export {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  checkAuth,
  refreshAccessToken,
};
