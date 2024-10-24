import User from "../models/user.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import cookieOptions from "../utils/cookieOptions.js";
import CustomError from "../utils/customError.js";

/******************************************************
 * @SIGNUP
 * @route http://localhost:5000/api/v1/auth/users
 * @method POST
 * @description User signUp Controller for creating new user
 * @parameters username, email, password
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the signup was successful
 *  - {string} token - JWT token for the authenticated user
 *  - {object} user - The newly created user object
 ******************************************************/

export const signUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new CustomError("Please fill all fields", 400);
  }
  //check if user exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new CustomError("User already exists", 400);
  }

  const user = await User.create({
    username,
    email,
    password,
  });
  const token = user.getJwtToken();
  console.log(user);
  user.password = undefined;

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    token,
    user,
  });
});

/******************************************************
 * @LOGIN
 * @route http://localhost:5000/api/v1/auth/login
 * @method POST
 * @description User signIn Controller for loging new user
 * @parameters  email, password
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful (true)
 *  - {string} token - JWT token for the authenticated user
 *  - {object} user - The user object containing details of the authenticated user
 ******************************************************/

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Please fill all fields", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  // console.log(user);

  if (!user) {
    throw new CustomError("Invalid credentials", 400);
  }

  const isPasswordMatched = await user.comparePassword(password);
  console.log(isPasswordMatched);

  if (isPasswordMatched) {
    const token = user.getJwtToken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      token,
      user,
    });
  }

  throw new CustomError("Invalid credentials", 400);
});

/******************************************************
 * @LOGOUT
 * @route http://localhost:5000/api/v1/auth/logout
 * @method GET
 * @description User logout by clearing user cookies
 * @parameters
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful (true)
 *  - {string} message - A message indicating the user has logged out ("Logged Out")
 ******************************************************/
export const logout = asyncHandler(async (_req, res) => {
  // res.clearCookie();
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

/******************************************************
 * @FETCHUSER
 * @route http://localhost:5000/api/v1/auth/users/:id
 * @method GET
 * @description get user by id
 * @parameters id
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful (true)
 *  - {object} user - The user object containing details of the user
 ******************************************************/
export const getUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.params);

  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

/******************************************************
 * @UPDATEUSER
 * @route http://localhost:5000/api/v1/auth/user/:id
 * @method PUT
 * @description Controller to update user details (username, email)
 * @parameters id (User ID), username, email (optional fields in the request body)
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the update was successful
 *  - {object} user - The updated user object
 ******************************************************/

export const updateUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  const user = await User.findById(id);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  user.username = username || user.username;
  user.email = email || user.email;

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});

/******************************************************
 * @DELETEUSER
 * @route http://localhost:5000/api/v1/auth/user/:id
 * @method DELETE
 * @description Controller to delete a user by ID
 * @parameters id (User ID in the request params)
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the deletion was successful
 *  - {string} message - A message confirming user deletion ("User deleted successfully")
 ******************************************************/
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
