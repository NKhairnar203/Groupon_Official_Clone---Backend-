// categoryRoutes.js
const express = require("express");
const Category = express.Router();
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
} = require("../controllers/category.controller");
const  verifyAdmin  = require("../middlewares/adminAuth.middleware");

// Add a new category (admin only)
Category.post("/", verifyAdmin, addCategory);

// Update a category (admin only)
Category.put("/:id",  verifyAdmin, updateCategory);

// Delete a category (admin only)
Category.delete("/:id",  verifyAdmin, deleteCategory);

// Get a specific category by ID
Category.get("/:id", getCategory);

// Get all categories
Category.get("/", getAllCategories);

module.exports = Category;
