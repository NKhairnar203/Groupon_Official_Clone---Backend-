const express = require("express");
const User = require("../models/user.model");
const Deal = require("../models/deals.model");
const verifyTokenForUser = require("../middlewares/usersAuth.middleware");
const adminCheck = require("../middlewares/adminCheck.middleware");

const AdminRoute = express.Router();

AdminRoute.use(verifyTokenForUser);
AdminRoute.use(adminCheck);

AdminRoute.get("/all-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

AdminRoute.get("/all-deals", async (req, res) => {
  try {
    const deals = await Deal.find();
    res.status(200).json({ Deals: deals });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = AdminRoute;
