const Category = require('../../models/category.models');

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get filtered categories
const getFilteredCategories = async (req, res) => {
  try {
    const filter = req.query.filter || '';
    const categories = await Category.find({ name: { $regex: filter, $options: 'i' } });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  const { categoryName } = req.body;
  try {
    const newCategory = new Category({ categoryName });
    await newCategory.save();
    res.status(201).json({ success: true, message: 'Category created successfully', data: newCategory });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({ success: false, message: 'Category categoryName already exists' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    category.name = name;
    await category.save();
    res.json({ success: true, message: 'Category updated successfully', data: category });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({ success: false, message: 'Category name already exists' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    await category.remove();
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getAllCategories,
  getFilteredCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
