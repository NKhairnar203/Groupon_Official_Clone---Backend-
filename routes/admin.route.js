const express = require("express");

const AdminRoute = express.Router();
const verifyAdmin = require("../middlewares/adminAuth.middleware")

const { registerAdmin, loginAdmin, getAllAdmins } = require('../controllers/admin.controller');

// Register a new admin
AdminRoute.post("/register", registerAdmin);

// Admin login
AdminRoute.post("/login", loginAdmin);

// Get all admins (protected route)
AdminRoute.get("/", verifyAdmin, getAllAdmins);


module.exports = AdminRoute;