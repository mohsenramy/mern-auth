import asyncHandler from "express-async-handler";

/**
 * @description   Register a User
 * @route         POST /api/v1/users
 * @access        Public
 */
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: " Register User" });
});
/**
 * @description   Authenticate a User
 * @route         POST /api/v1/users/auth
 * @access        Public
 */
const authenticateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: " Authenticate User" });
});
/**
 * @description   Logout a User
 * @route         POST /api/v1/users/logout
 * @access        Public
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: " Logout User" });
});
/**
 * @description   Get a User profile
 * @route         GET /api/v1/users/profile
 * @access        Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: " Get User Profile" });
});
/**
 * @description   Update a User profile
 * @route         PUT /api/v1/users
 * @access        Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: " Update User Profile" });
});

export {
  registerUser,
  authenticateUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
