const asyncHandler = require("express-async-handler");

const WebConfig = require("../models/webConfigModel");

const getWebConfig = asyncHandler(async (req, res) => {
  const webConfig = await WebConfig.find();
  res.status(200).json(webConfig);
});

const updateWebConfig = asyncHandler(async (req, res) => {
  const { wid } = req.params;
  if (!wid) {
    res.status(400);
    throw new Error("Missing inputs");
  }

  const webConfig = await WebConfig.findByIdAndUpdate(wid, req.body, {
    new: true,
  });
  res.status(200).json({
    mes: "Update success",
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
