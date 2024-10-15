const Icon = require("../models/iconModel");

const asyncHandler = require("express-async-handler");

const getAllIcons = asyncHandler(async (req, res) => {
  const icons = await Icon.find();
  return res.status(200).json(icons);
});

const addIconClass = asyncHandler(async (req, res) => {
  const { name, className } = req.body;

  if (!name || !className) {
    return res.status(400).json({ mes: "Name and className are required" });
  }
  const icon = new Icon({ name, className });
  await icon.save();
  return res.status(201).json({
    mes: "Icon added successfully",
    icon,
  });
});

const addManyIconClass = asyncHandler(async (req, res) => {
  const icons = req.body;

  if (!icons || !Array.isArray(icons) || icons.length === 0) {
    return res.status(400).json({ mes: "Invalid data" });
  }

  const result = await Icon.insertMany(icons);

  return res.status(201).json({
    mes: "Icons added successfully",
    result,
  });
});

const updateIconClass = asyncHandler(async (req, res) => {
  const { iconId } = req.params;

  if (!iconId || Object.keys(req.body).length === 0) {
    return res.status(400).json({ mes: "Missing data to update" });
  }

  const icon = await Icon.findByIdAndUpdate(iconId, req.body, { new: true });

  if (!icon) {
    return res.status(400).json({ mes: "Icon not found" });
  }

  return res.status(200).json({
    mes: icon ? "Update icon is successful" : "Some thing went wrong",
    icon,
  });
});

const deleteIconClass = asyncHandler(async (req, res) => {
  const { iconId } = req.params;

  if (!iconId) {
    return res.status(400).json({ mes: "Missing id of icon" });
  }

  const icon = await Icon.findByIdAndDelete(iconId);

  if (!icon) throw new Error("Icon not found");

  return res.status(200).json({ mes: "Icon deleted successfully" });
});

const deleteManyIconClass = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ mes: "Missing or invalid ids of icon" });
  }

  const result = await Icon.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount === 0) {
    return res.status(404).json({ mes: "Icons not found" });
  }

  return res.status(200).json({ mes: "Icons deleted successfully" });
});

module.exports = {
  getAllIcons,
  addIconClass,
  addManyIconClass,
  updateIconClass,
  deleteIconClass,
  deleteManyIconClass,
};
