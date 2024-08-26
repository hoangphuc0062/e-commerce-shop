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
  const products = await Product.find({}).populate("category", "name");
  return res.status(200).json({
    success: products ? true : false,
    products,
  });
});

const addProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, imageUrl } = req.body;
  if (!name || !price || !description || !category || !imageUrl) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }
  const product = await Product.create(req.body);
  return res.status(200).json({
    success: product ? true : false,
    mes: product ? "Create product is succesful" : "Some thing went wrong",
  });
});

const deleteProductByAdmin = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid) throw new Error("Missing inputs");
  const product = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: product ? true : false,
    mes: product ? "Delete product is succesful" : "Some thing went wrong",
  });
});
const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  console.log(pid);
  if (!_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }
  const product = await Product.findOneAndUpdate({ pid }, req.body);
  return res.status(200).json({
    success: product ? true : false,
    mes: product ? "Update product is succesful" : "Some thing went wrong",
    product,
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category } = req.body;
  let imagePaths = [];
  if (!req.files) {
    return res.status(400).json({
      success: false,
      mes: "Missing file upload",
    });
  }

  if (!name || !price || !description || !category) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs ",
    });
  }

  if (req.files) {
    // Handle multiple files
    let imagePaths = req.files.map((file) => file.path);
  }
  if (req.file) {
    let imagePaths = req.file.path;
  }

  const product = await Product.create({
    ...req.body,
    images: imagePaths,
  });

  return res.status(200).json({
    success: true,
    mes: product ? "Product creation is successful" : "Something went wrong",
  });
});
module.exports = {
  getProduct,
  getAllProduct,
  addProduct,
  deleteProductByAdmin,
  updateProduct,
  uploadImagesProduct,
};
