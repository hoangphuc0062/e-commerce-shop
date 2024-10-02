const asyncHandler = require("express-async-handler");

const BannerCollection = require("../models/bannerCollectionModel");

const getAllBannerCollection = asyncHandler(async (req, res) => {
  const bannerCollection = await BannerCollection.find({});
  return res.status(200).json({
    mes: "Get all banner collection is successful",
    bannerCollection,
  });
});

const createBannerCollection = asyncHandler(async (req, res) => {
  const { series_id, banner, status, priorty_level, startDate, end_Date } =
    req.body;
  if (!series_id || !banner || !priorty_level) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const bannerCollection = new BannerCollection({
    series_id,
    banner,
    status,
    priorty_level,
    startDate,
    end_Date,
  });
  await bannerCollection.save();
  return res.status(201).json({
    mes: "Create banner collection is successful",
    bannerCollection,
  });
});

const updateBannerCollection = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const bannerCollection = await BannerCollection.findByIdAndUpdate(
    bid,
    req.body
  );
  return res.status(200).json({
    mes: bannerCollection
      ? "Update banner collection is successful"
      : "Some thing went wrong",
    bannerCollection,
  });
});

const deleteBannerCollection = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const bannerCollection = await BannerCollection.findById(bid);
  if (!bannerCollection) {
    return res.status(404).json({
      mes: "Banner collection not found",
    });
  } else {
    await bannerCollection.deleteOne();
    return res.status(200).json({
      mes: "Delete banner collection is successful",
    });
  }
});

module.exports = {
  getAllBannerCollection,
  createBannerCollection,
  updateBannerCollection,
  deleteBannerCollection,
};
