
const Category = require("../models/category.model");

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const { name, description, parentCategory } = req.body;

    const newCategory = new Category({ name, description, parentCategory });
    await newCategory.save();

    res
      .status(201)
      .json({
        message: "Category created successfully",
        category: newCategory,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, parentCategory } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { name, description, parentCategory },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a specific category by ID
exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id).populate(
      "parentCategory",
      "name"
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parentCategory", "name");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
