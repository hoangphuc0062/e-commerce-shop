const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Brand = require("../models/brandModel");
const Series = require("../models/seriesModel");

const asyncHandler = require("express-async-handler");

// Filter - sort - pagination
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const queries = { ...req.query };
    const excludeFields = ["sort", "page", "limit", "fields"];
    excludeFields.forEach((el) => delete queries[el]); //  xóa từng trường (key) tương ứng trong đối tượng queries nếu trường đó tồn tại trong mảng.

    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (matchedEl) => `$${matchedEl}`
    );
    const formattedQueries = JSON.parse(queryString);

    if (queries?.title)
      formattedQueries.title = { $regex: queries.title, $options: "i" };

    // query theo id
    if (queries?.category) {
      formattedQueries.category = queries.category;
    }

    if (queries?.brand) {
      formattedQueries.brand = queries.brand;
    }
    if (queries?.series) {
      formattedQueries.series = queries.series;
    }

    if (queries?.warehouses) {
      formattedQueries.warehouse = queries.warehouses;
    }

    let queryCommand = Product.find(formattedQueries);

    if (queries?.series) {
      queryCommand = queryCommand.populate("series", "name slug");
    }

    if (queries?.brand) {
      queryCommand = queryCommand.populate("brand", "name slug");
    }

    if (queries?.category) {
      queryCommand = queryCommand.populate("category", "name slug");
    }

    if (queries?.attributes) {
      queryCommand = queryCommand.populate({
        path: "attributes.aid",
        select: "name values",
      });
    }

    if (queryCommand?.tagsProduct) {
      queryCommand = queryCommand.populate("tagsProduct", "name");
    }

    if (queries?.warehouses) {
      queryCommand = queryCommand.populate("warehouse", "name");
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queryCommand = queryCommand.select(fields);
    }

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    const response = await queryCommand.exec();
    const counts = await Product.find(formattedQueries).countDocuments();

    return res.status(200).json({
      counts,
      products: response.length ? response : "Không tìm thấy sản phẩm",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi server",
      error: error.message,
    });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  const requiredFields = [
    "name",
    "slug",
    "historicalPrice",
    "description",
    "images",
    "weight",
    "SKU",
    "priceInMarket",
    "price",
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

  const product = await Product.create(req.body);
  return res.status(201).json({
    mes: product ? "create a product successfull" : "Some thing went wrong",
    product,
  });
});

const addManyProduct = asyncHandler(async (req, res) => {
  const products = req.body;
  if (!products && products.length === 0 && !Array.isArray(products)) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const product = await Product.insertMany(products);
  return res.status(201).json({
    mes: product ? "create product successfull" : "Some thing went wrong",
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

  const product = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });

  return res.status(200).json({
    mes: product ? "Update product is succesful" : "Fail to update product",
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
  if (!product) throw new Error("Product is not found in datase");
  return res.status(200).json({
    mes: product ? "Delete product is succesful" : "Some thing went wrong",
  });
});

module.exports = {
  getAllProduct,
  addProduct,
  addManyProduct,
  updateProduct,
  deleteProduct,
};
