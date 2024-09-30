const Product = require("../models/productModel");

const asyncHandler = require("express-async-handler");

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid) throw new Error("Missing inputs");
  const product = await Product.findById(pid)
    .populate("category", "name")
    .populate("brand", "name")
    .populate("sery", "name");
  return res.status(200).json({
    success: product ? true : false,
    product,
  });
});

// Filter - sort - pagination
const getAllProduct = asyncHandler(async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const products = await Product.find({})
    .populate("category", "name")
    .populate("brand", "name")
    .populate("sery", "name")
    .skip(parseInt(offset))
    .limit(parseInt(limit));
  return res.status(200).json({
    products,
  });
});

const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    SKU,
    historicalPrice,
    priceInMarket,
    priceInStore,
    priceOnline,
    sery,
    onStock,
    unit,
    description,
    images,
    weight,
    specifications,
  } = req.body;
  if (
    !name ||
    !historicalPrice ||
    !priceInStore ||
    !priceOnline ||
    !sery ||
    !description ||
    !images ||
    !weight ||
    !SKU ||
    !priceInMarket ||
    !onStock ||
    specifications.length === 0 ||
    !unit
  )
    throw new Error("Missing inputs");

  const product = await Product.create({
    name,
    SKU,
    historicalPrice,
    priceInMarket,
    priceInStore,
    priceOnline,
    sery,
    onStock,
    unit,
    description,
    images,
    weight,
    specifications,
  }).save();
});

module.exports = {
  getProduct,
  getAllProduct,
};
