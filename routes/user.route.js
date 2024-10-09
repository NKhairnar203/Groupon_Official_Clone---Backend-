const express = require("express");

const UserRoute = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
} = require("../controllers/users.controller");
const verifyTokenForUser = require("../middlewares/usersAuth.middleware");
const verifyAdmin = require("../middlewares/adminAuth.middleware");

// Register a new user
UserRoute.post("/register", registerUser);

// User login
UserRoute.post("/login", loginUser);

// Get user details (protected route)
UserRoute.get("/:id", [verifyTokenForUser, verifyAdmin], getUser);

// Update user details (protected route)
UserRoute.put("/:id", [verifyTokenForUser, verifyAdmin], updateUser);

module.exports = UserRoute;
