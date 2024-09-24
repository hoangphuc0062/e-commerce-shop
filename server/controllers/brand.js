const Brand = require("../models/Brand");

const asyncHandler = require("express-async-handler");

const getAllBrand = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  return res.status(200).json({
    success: true,
    brands,
  });
});

module.exports = {
  getAllBrand,
};
