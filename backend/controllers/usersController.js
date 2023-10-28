const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// @desc    GET USERS
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler( async (req, res) => {
  res.status(200).json({ message: "DISPLAY ALL USERS" });
});

// @desc    CREATE USER
// @route   POST /api/users
// @access  Private
const createUser = asyncHandler( async  (req, res) => {
  res.status(200).json({ message: "Create User"});
});

// @desc    UPDATE USER
// @route   PUT /api/users
// @access  Private
const updateUser = asyncHandler( async (req, res) => {
    res.status(200).json({ message: `Updating user ${req.params.id}` });
});

// @desc    DELETE USER
// @route   DELETE /api/users
// @access  Private
const deleteUser =  asyncHandler( async (req, res) => {
    res.status(200).json({ message: `Deleting user ${req.params.id}` });
});

// @desc    Auth user/set token
// @route   POST /api/users/auth
// @access  PUBLIC
const authUser = asyncHandler( async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.status(200).json({message:  'Auth User'});
});

// @desc    Register User
// @route   POST /api/users/register
// @access  PUBLIC
const registerUser = asyncHandler( async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({email});

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({name, email, password});

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout User
// @route   POST /api/users/logout
// @access  PUBLIC
const logoutUser = asyncHandler( async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({message:  'User logged out'});
});

// @desc    Get user profile
// @route   POST /api/users/profile
// @access  PRIVATE
const getUserProfile = asyncHandler( async (req, res) => {
  res.status(200).json({message:  'User Profile'});
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  PRIVATE
const updateUserProfile = asyncHandler( async (req, res) => {
  res.status(200).json({message:  'Updata User Profile'});
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
