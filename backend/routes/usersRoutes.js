const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getUsers,
  updateUser,
  deleteUser,
  createUser,
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/usersController");

// USERS ROUTES
router.route("/").get(getUsers).post(createUser);
router.route("/:id").delete(deleteUser);
router.route("/auth").post(authUser);
router.route("/register").post(registerUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);

module.exports = router;
