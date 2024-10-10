const Attribute = require("../models/attributeModel");

const asyncHandler = require("express-async-handler");

const getAllAttribute = asyncHandler(async (req, res) => {
  const attributes = await Attribute.find();
  return res.status(200).json(attributes);
});

const addAttribute = asyncHandler(async (req, res) => {
  const { name, value } = req.body;

  if (!name || !value) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }

  const attribute = new Attribute(req.body);

  await attribute.save();

  return res.status(200).json({
    mes: "Add attribute is successful",
  });
});

const deleteAttribute = asyncHandler(async (req, res) => {
  const { aid } = req.params;

  await Attribute.findByIdAndDelete(aid);

  return res.status(200).json({
    mes: "Delete attribute is successful",
  });
});

const deleteManyAttribute = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0)
    throw Error("Missing ids to delete");

  await Attribute.deleteMany({ _id: { $in: ids } });

  return res.status(200).json({
    mes: "Delete attributes is successful",
  });
});

const updateAttribute = asyncHandler(async (req, res) => {
  const { aid } = req.params;

  if (!aid || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }

  const attribute = await Attribute.findByIdAndUpdate(aid, req.body, {
    new: true,
  });

  return res.status(200).json({
    mes: attribute ? "Update attribute is successful" : "Some thing went wrong",
    attribute,
  });
});

module.exports = {
  getAllAttribute,
  addAttribute,
  deleteAttribute,
  deleteManyAttribute,
  updateAttribute,
};
