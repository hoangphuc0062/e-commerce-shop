const mongoose = require("mongoose");
const SettingFilter = require("../models/settingFilterModel");
const Category = require("../models/categoryModel");

const getAllSettingFilter = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const query = search ? { category: { $regex: search, $options: "i" } } : {};

    const settingFilters = await SettingFilter.find(query)
      .limit(parseInt(limit))
      .skip((page - 1) * limit);

    const total = await SettingFilter.countDocuments(query);

    return res.status(200).json({
      settingFilters,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ mes: "Server error", error });
  }
};

const getAllSettingFilterById = async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).json({ mes: "Missing inputs" });
  }

  const settingFilter = await SettingFilter.findById(_id);
  return res.status(200).json({
    mes: settingFilter
      ? "Get setting filter by id is successful"
      : "Get setting filter by id is failed",
    settingFilter,
  });
};

const getCategoryNameInCategoryFilter = async (req, res) => {
  const { category } = req.body;

  if (!Array.isArray(category))
    return res.status(400).json({ mes: "Category must be array" });

  const existCategory = await Category.find({ slug: { $in: category } });

  if (existCategory.length === 0)
    return res.status(400).json({ mes: "Category not found" });

  const rs = existCategory.map((item) => {
    return { name: item.name, slug: item.slug };
  });

  return res.status(200).json({
    mes: rs ? "Get category name is successful" : "Get category name is failed",
    rs,
  });
};

const createSettingFilter = async (req, res) => {
  const { category, filterButton } = req.body;

  try {
    if (!category || !filterButton) {
      return res.status(400).json({ mes: "Missing inputs" });
    }

    const existSettingFilter = await SettingFilter.findOne({ category });
    if (existSettingFilter) {
      return res
        .status(400)
        .json({ mes: "Setting filter for this category already exists" });
    }

    const newSettingFilter = new SettingFilter({
      category,
      filterButton,
    });

    const savedSettingFilter = await newSettingFilter.save();
    res.status(201).json({
      mes: savedSettingFilter
        ? "Create setting filter is successful"
        : "Create setting filter is failed",
    });
  } catch (error) {
    res.status(500).json({ mes: "Server error", error });
  }
};
const updateSettingFilter = async (req, res) => {
  const { _id } = req.params;

  if (!_id && Object.keys(req.body).length === 0) {
    return res.status(400).json({ mes: "Missing inputs" });
  }

  const settingFilter = await SettingFilter.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!settingFilter) {
    return res
      .status(400)
      .json({ mes: "No setting filter found with the provided id" });
  }

  return res.status(200).json({
    mes: settingFilter
      ? "Update setting filter is successful"
      : "Update setting filter is failed",
    settingFilter,
  });
};

const updateSettingFilterOne = async (req, res) => {
  const { _id, filterButtonId } = req.params;

  if (!_id || !filterButtonId || Object.keys(req.body).length === 0) {
    return res.status(400).json({ mes: "Missing inputs" });
  }

  try {
    const existSettingFilter = await SettingFilter.findById(_id);

    if (!existSettingFilter) {
      return res.status(404).json({ mes: "Setting filter not found" });
    }

    const filterButton = existSettingFilter.filterButton.id(filterButtonId);

    if (!filterButton) {
      return res.status(404).json({ mes: "Filter button not found" });
    }

    filterButton.set(req.body);

    await existSettingFilter.save();

    return res.status(200).json({ mes: "Filter button updated successfully" });
  } catch (error) {
    return res.status(500).json({ mes: "Server error", error: error.message });
  }
};

const deleteSettingFilter = async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).json({ mes: "Missing inputs" });
  }

  const existSettingFilter = await SettingFilter.findById(_id);

  if (!existSettingFilter) {
    return res
      .status(400)
      .json({ mes: "No setting filter found with the provided id" });
  }

  const settingFilter = await SettingFilter.findByIdAndDelete(_id);

  return res.status(200).json({
    mes: settingFilter
      ? "Delete setting filter is successful"
      : "Delete setting filter is failed",
  });
};

const deleteSettingFilterOne = async (req, res) => {
  const { _id, filterButtonId } = req.params;

  if (!_id || !filterButtonId) {
    return res.status(400).json({ mes: "Missing inputs" });
  }

  try {
    const existSettingFilter = await SettingFilter.findById(_id);

    if (!existSettingFilter) {
      return res.status(404).json({ mes: "Setting filter not found" });
    }

    await SettingFilter.findByIdAndUpdate(
      _id,
      { $pull: { filterButton: { _id: filterButtonId } } },
      { new: true }
    );

    return res.status(200).json({ mes: "Filter button deleted successfully" });
  } catch (error) {
    return res.status(500).json({ mes: "Server error", error: error.message });
  }
};

module.exports = {
  getAllSettingFilter,
  getCategoryNameInCategoryFilter,
  getAllSettingFilterById,
  createSettingFilter,
  updateSettingFilter,
  updateSettingFilterOne,
  deleteSettingFilter,
  deleteSettingFilterOne,
};
