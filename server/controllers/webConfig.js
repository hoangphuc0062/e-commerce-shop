const asyncHandler = require("express-async-handler");

const WebConfig = require("../models/webConfig");

const getWebConfig = asyncHandler(async (req, res) => {
  const webConfig = await WebConfig.findOne();
  res.status(200).json({
    mes: "Get success",
    webConfig,
  });
});

const updateWebConfig = asyncHandler(async (req, res) => {
  const { wid, ...data } = req.body;
  if (!wid) {
    res.status(400);
    throw new Error("Missing inputs");
  }

  const webConfig = await WebConfig.findByIdAndUpdate(wid, data, { new: true });
  res.status(200).json({
    mes: "Update success",
    webConfig,
  });
});

const createWebConfig = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("Missing inputs");
  }

  const webConfig = await WebConfig.create(req.body);
  res.status(201).json({
    mes: "Create success",
    webConfig,
  });
});

const deleteWebConfig = asyncHandler(async (req, res) => {
  const { wid } = req.params;
  if (!wid) {
    res.status(400);
    throw new Error("Missing inputs");
  }
  const webConfig = await WebConfig.findByIdAndDelete(wid);
  res.status(200).json({
    mes: "Delete success",
    webConfig,
  });
});

module.exports = {
  getWebConfig,
  updateWebConfig,
  createWebConfig,
  deleteWebConfig,
};
