const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");

const getAllBrand = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  return res.status(200).json(brands);
});

const addBrand = asyncHandler(async (req, res) => {
  const { name, category, image } = req.body;

  if (!name || !category || !image) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }

  const brand = new Brand(req.body);
  await brand.save();

  return res.status(200).json({
    mes: "Add brand is successful",
  });
});
const updateBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;

  if (!bid || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const brand = await Brand.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: brand ? true : false,
    mes: brand ? "Update brand is successful" : "Some thing went wrong",
    brand,
  });
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;

  if (!bid) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const brand = await Brand.findByIdAndDelete(bid);
  return res.status(200).json({
    success: brand ? true : false,
    mes: brand ? "Delete brand is successful" : "Some thing went wrong",
  });
});

module.exports = {
  getAllBrand,
  addBrand,
  updateBrand,
  deleteBrand,
};
