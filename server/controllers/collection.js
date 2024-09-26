const Collection = require("../models/collection");

const asyncHandler = require("express-async-handler");

const getAllCollection = asyncHandler(async (req, res) => {
  const collections = await Collection.find();

  return res.status(200).json(collections);
});

const addCollection = asyncHandler(async (req, res) => {
  const { name, type, brand } = req.body;
  if (!name || !type || !brand) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const collection = new Collection(req.body);
  await collection.save();

  return res.status(200).json({
    mes: "Add collection is successful",
  });
});

module.exports = {
  getAllCollection,
  addCollection,
};
