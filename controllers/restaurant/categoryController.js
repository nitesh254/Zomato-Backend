const asyncHandler = require('express-async-handler');
const Category = require('../../models/restaurant/categorySchema');

// Add a category
const addCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while adding the category', error: error.message });
  }
});

// Edit a category
const editCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update only provided fields
    if (name) category.name = name;
    if (description) category.description = description;

    await category.save();
    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the category", error: error.message });
  }
});

// Delete a category by ID
const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the category", error: error.message });
  }
});

// Get all categories
const getAllCategories = asyncHandler(async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching categories", error: error.message });
    }
  });

module.exports = { addCategory, editCategory, deleteCategory, getAllCategories };
