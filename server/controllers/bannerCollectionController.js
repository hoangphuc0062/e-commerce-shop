const asyncHandler = require("express-async-handler");

const BannerCollection = require("../models/bannerCollectionModel");

const getAllBannerCollection = asyncHandler(async (req, res) => {
  const sortBy = req.query.sort;
  const order = req.query.order === "asc" ? 1 : -1;
  const bannerCollection = await BannerCollection.find()
    .populate("series", "name slug")
    .populate("brand", "name slug")
    .populate("category", "name slug")
    .sort([[sortBy, order]]);
  return res.status(200).json(bannerCollection);
});

const createBannerCollection = asyncHandler(async (req, res) => {
  const bannerCollection = await BannerCollection.create(req.body);
  return res.status(201).json(bannerCollection);
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

const getBannerCollectionById = asyncHandler(async (req, res) => {
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
  }
  return res.status(200).json(bannerCollection);
});
module.exports = {
  getAllBannerCollection,
  createBannerCollection,
  updateBannerCollection,
  deleteBannerCollection,
  getBannerCollectionById,
};
