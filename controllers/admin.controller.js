// adminController.js
const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new admin
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role} = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create a new admin
    const newAdmin = new Admin({ name, email, password, role});
    await newAdmin.save();
    res
      .status(201)
      .json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.isValidPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.USER_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all admins (protected route)
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
