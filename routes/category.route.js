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
const adminCheck = require("../middlewares/adminCheck.middleware");

// Add a new category (admin only)
Category.post("/",  addCategory);

// Update a category (admin only)
Category.put("/:id",  adminCheck, updateCategory);

// Delete a category (admin only)
Category.delete("/:id", adminCheck, deleteCategory);

// Get a specific category by ID
Category.get("/:id", getCategory);

// Get all categories
Category.get("/", getAllCategories);

module.exports = Category;
