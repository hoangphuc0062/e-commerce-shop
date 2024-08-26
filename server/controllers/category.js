const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  return res.status(200).json({
    success: true,
    categories,
  });
});
const addCategory = asyncHandler(async (req, res) => {
  const { name, parent } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }
  const category = await Category.create(req.body);
  return res.status(200).json({
    success: category ? true : false,
    mes: category ? "Create category is succesful" : "Some thing went wrong",
  });
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }

  const category = await Category.findByIdAndDelete(_id);
  return res.status(200).json({
    success: category ? true : false,
    mes: category ? "Delete category is succesful" : "Some thing went wrong",
  });
});
const updateCategory = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  if (!_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }

  const category = await Category.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: category ? true : false,
    mes: category ? "Update category is succesful" : "Some thing went wrong",
    category,
  });
});

module.exports = {
  getAllCategory,
  addCategory,
  deleteCategory,
  updateCategory,
};
