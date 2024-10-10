const Product = require("../models/productModel");

const asyncHandler = require("express-async-handler");

// const getProduct = asyncHandler(async (req, res) => {
//   const { pid } = req.params;
//   if (!pid) throw new Error("Missing inputs");
//   const product = await Product.findById(pid)
//     .populate("categories", "name")
//     .populate("brands", "name")
//     .populate("series", "name");
//   return res.status(200).json({
//     success: product ? true : false,
//     product,
//   });
// });

const getProductById = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid) throw new Error("Missing inputs");
  const product = await Product.findById(pid);
  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }
  return res.status(200).json({
    success: product ? true : false,
    product,
  });
});

const getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  if (!slug) throw new Error("Missing inputs");
  const product = await Product.findOne({ slug })
    .populate("categories", "name")
    .populate("brands", "name")
    .populate("series", "name");

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }
  return res.status(200).json({
    success: product ? true : false,
    product,
  });
});

// Filter - sort - pagination
const getAllProduct = asyncHandler(async (req, res) => {
  const {
    limit = 10,
    offset = 0,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  const products = await Product.find({})
    .populate("category", "name")
    .populate("brand", "name")
    .populate("series", "name")
    .skip(parseInt(offset))
    .limit(parseInt(limit))
    .sort({ [sortBy]: order === "desc" ? -1 : 1 });

  return res.status(200).json({
    products,
  });
});

const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    SKU,
    slug,
    historicalPrice,
    priceInMarket,
    priceInStore,
    priceOnline,
    onStock,
    unit,
    description,
    images,
    weight,
    specifications,
    discount,
    minInventory,
    maxInventory,
    isBattery,
    isMain,
    isStopSelling,
    keywords,
    titleSEO,
    descriptionSEO,
    thumbnail,
    videos,
    status,
    rating,
    warranty,
    attributes,
    gifts,
    category,
    brand,
    series,
  } = req.body;

  const requiredFields = [
    "name",
    "slug",
    "historicalPrice",
    "priceInStore",
    "priceOnline",
    "series",
    "category",
    "brand",
    "description",
    "images",
    "weight",
    "SKU",
    "priceInMarket",
    "onStock",
    "unit",
  ];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({
        error: `${field} is required`,
      });
    }
  }
  const productData = {
    name,
    SKU,
    slug,
    historicalPrice,
    priceInMarket,
    priceInStore,
    priceOnline,
    series,
    category,
    brand,
    onStock,
    unit,
    description,
    images,
    weight,
    specifications,
    ...(discount && { discount }),
    ...(minInventory && { minInventory }),
    ...(maxInventory && { maxInventory }),
    ...(isBattery && { isBattery }),
    ...(isMain && { isMain }),
    ...(isStopSelling && { isStopSelling }),
    ...(keywords && { keywords }),
    ...(titleSEO && { titleSEO }),
    ...(descriptionSEO && { descriptionSEO }),
    ...(thumbnail && { thumbnail }),
    ...(videos && { videos }),
    ...(status && { status }),
    ...(rating && { rating }),
    ...(warranty && { warranty }),
    ...(attributes && { attributes }),
    ...(gifts && { gifts }),
  };
  const product = await Product.create(productData);
  return res.status(201).json({
    mes: product ? "create a product successfull" : "Some thing went wrong",
    product,
  });
});

const addManyProduct = asyncHandler(async (req, res) => {
  const products = req.body;
  if (!products) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const product = await Product.insertMany(products);
  return res.status(201).json({
    mes: product ? "create a product successfull" : "Some thing went wrong",
    product,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;

  if (!pid || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const product = await Product.findOneAndUpdate({ pid }, req.body);
  return res.status(200).json({
    mes: product ? "Update product is succesful" : "Some thing went wrong",
    product,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const product = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    mes: product ? "Delete product is succesful" : "Some thing went wrong",
    product,
  });
});

module.exports = {
  getProductById,
  getProductBySlug,
  getAllProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
