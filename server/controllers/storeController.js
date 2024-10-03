const asyncHandler = require("express-async-handler");

const Store = require("../models/storeModel");

const createStore = asyncHandler(async (req, res) => {
  const {
    name,
    address,
    phone,
    description,
    image,
    link_google_map,
    open_time,
  } = req.body;
  if (!name) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const existingStore = await Store.findOne({ name });
  if (existingStore) {
    return res.status(400).json({
      mes: "Store already exists",
    });
  }
  const createdStore = await Store.create({
    name,
    address,
    phone,
    description,
    image,
    link_google_map,
    open_time,
  });
  res.status(201).json({
    mes: "Store created",
    createdStore,
  });
});

const getStores = asyncHandler(async (req, res) => {
  const stores = await Store.find({});

  return res.status(200).json({
    mes: "Stores found",
    stores,
  });
});

const updateStore = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const store = await Store.findByIdAndUpdate(_id, req.body);
  return res.status(200).json({
    mes: store ? "Update store is succesful" : "Some thing went wrong",
  });
});

const deleteStore = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const store = await Store.findById(_id);
  if (!store) {
    return res.status(404).json({
      mes: "Store not found",
    });
  } else {
    await store.deleteOne();
    return res.status(200).json({
      mes: "Delete store is succesful",
    });
  }
});

module.exports = {
  createStore,
  getStores,
  updateStore,
  deleteStore,
};
