const Tag = require("../models/tagModel");
const asyncHandler = require("express-async-handler");

const createTag = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const existingTag = await Tag.findOne({ name });
  if (existingTag) {
    return res.status(400).json({
      mes: "Tag already exists",
    });
  }
  const tag = await Tag.create(req.body);
  return res.status(200).json({
    mes: "Tag created",
    tag,
  });
});

const getTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find({});
  return res.status(200).json({
    mes: tags ? "Get tags is succesful" : "Some thing went wrong",
    tags,
  });
});

const updateTag = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const tag = await Tag.findByIdAndUpdate(_id, req.body);
  return res.status(200).json({
    mes: tag ? "Update tag is succesful" : "Some thing went wrong",
  });
});

const deleteTag = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const tag = await Tag.findById(_id);
  if (!tag) {
    return res.status(404).json({
      mes: "Tag not found",
    });
  } else {
    await tag.deleteOne();
    return res.status(200).json({
      mes: "Delete tag is succesful",
    });
  }
});

module.exports = {
  createTag,
  getTags,
  updateTag,
  deleteTag,
};
