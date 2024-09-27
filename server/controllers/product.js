const Product = require("../models/product");

const asyncHandler = require("express-async-handler");

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid) throw new Error("Missing inputs");
  const product = await Product.findById(pid);
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
    .skip(parseInt(offset))
    .limit(parseInt(limit));
  return res.status(200).json({
    success: products ? true : false,
    products,
  });
});

const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    priceInStore,
    priceOnline,
    category,
    brand,
    collection,
    description,
    images,
  } = req.body;
  if (
    !name ||
    !priceInStore ||
    priceOnline ||
    !category ||
    !description ||
    !images
  )
    throw new Error("Missing inputs");
  const product = new Product({
    name,
    price,
    category,
    description,
    images,
  });
  await product.save();
  return res.status(200).json({
    success: true,
    product,
  });
});

module.exports = {
  getProduct,
  getAllProduct,
};
