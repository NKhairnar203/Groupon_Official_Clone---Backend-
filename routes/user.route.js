const express = require("express");

const UserRoute = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  getAllUser,
} = require("../controllers/users.controller");
const verifyTokenForUser = require("../middlewares/usersAuth.middleware");
const adminCheck = require("../middlewares/adminCheck.middleware");

// Register a new user
UserRoute.post("/register", registerUser);

// User login
UserRoute.post("/login", loginUser);

// Get user details (protected route)
UserRoute.get("/:id", [verifyTokenForUser], getUser);


UserRoute.get("/", [verifyTokenForUser, adminCheck], getAllUser);

// Update user details (protected route)
UserRoute.put("/:id", [verifyTokenForUser, adminCheck], updateUser);

module.exports = UserRoute;
