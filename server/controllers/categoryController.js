const Category = require("../models/categoryModel");

const asyncHandler = require("express-async-handler");

const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find()
    .populate("icon", "name className")
    .populate("brand", "name slug");

  return res.status(200).json(categories);
});

const addCategory = asyncHandler(async (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }

  const category = new Category(req.body);
  await category.save();

  return res.status(200).json({
    mes: "Add category is succesful",
    category,
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const category = await Category.findByIdAndDelete(_id);
  return res.status(200).json({
    mes: category ? "Delete category is succesful" : "Some thing went wrong",
  });
});

const deleteManyCategories = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw Error("Missing ids to delete");
  }

  const result = await Category.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount === 0) {
    return res.status(400).json({
      mes: "No categories found with the provided ids",
    });
  }

  return res.status(200).json({
    mes: "Delete categories is succesful",
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const category = await Category.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!category) {
    return res.status(400).json({
      mes: "No category found with the provided id",
    });
  }

  return res.status(200).json({
    mes: category ? "Update category is succesful" : "Some thing went wrong",
    category,
  });
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const category = await Category.findById(_id).populate("brand", "name slug");
  if (!category) {
    return res.status(400).json({
      mes: "No category found with the provided id",
    });
  }
  return res.status(200).json({
    mes: "Get category by id is succesful",
    category,
  });
});

const updateManyPosition = asyncHandler(async (req, res) => {
  const { data } = req.body;
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw Error("Missing data to update");
  }
  for (let i = 0; i < data.length; i++) {
    const { _id, position } = data[i];
    await Category.findByIdAndUpdate(_id, { position });
  }
  return res.status(200).json({
    mes: "Update position is succesful",
  });
});

module.exports = {
  getAllCategory,
  addCategory,
  deleteCategory,
  deleteManyCategories,
  updateCategory,
  getCategoryById,
  updateManyPosition,
};
