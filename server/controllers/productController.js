const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Brand = require("../models/brandModel");
const Series = require("../models/seriesModel");

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

    // query slug category - brand - series

    if (queries?.slug) {
      const [matchCategory, matchBrand, matchSeries] = queries.slug.split(",");

      const entities = [
        {
          match: matchCategory,
          model: Category,
          key: "category",
          errorMessage: `Category ${matchCategory} is not found`,
        },
        {
          match: matchBrand,
          model: Brand,
          key: "brand",
          errorMessage: `Brand ${matchBrand} is not found`,
        },
        {
          match: matchSeries,
          model: Series,
          key: "series",
          errorMessage: `Series ${matchSeries} is not found`,
        },
      ];

      for (const entity of entities) {
        if (entity.match) {
          const result = await entity.model.findOne({ slug: entity.match });
          if (!result) {
            return res.status(404).json({ mes: entity.errorMessage });
          }
          formattedQueries[entity.key] = result._id;
        }
      }
      delete formattedQueries.slug;
    }

    let queryCommand = Product.find(formattedQueries);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");

      const populateFields = {
        category: "name slug",
        brand: "name slug",
        series: "name slug",
        warehouse: "name",
        tagsProduct: "name",
      };

      Object.keys(populateFields).forEach((field) => {
        if (fields.includes(field)) {
          queryCommand = queryCommand.populate(field, populateFields[field]);
        }
      });

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
      products: response.length ? response : "No product found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  const product = req.body;
  if (!product) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }

  const existedProduct = await Product.findOne({ slug: product?.slug });

  if (existedProduct) {
    return res.status(400).json({
      mes: "Product is already existed",
    });
  }
  const newProduct = await Product.create(product);
  return res.status(201).json({
    mes: newProduct ? "create product successfull" : "Some thing went wrong",
    newProduct,
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

  const product = await Product.findByIdAndUpdate(pid, req.body.data, {
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
  if (!product) throw new Error("Product is not found in database");
  return res.status(200).json({
    mes: product ? "Delete product is succesful" : "Some thing went wrong",
  });
});

const getProductBySlug = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const product = await Product.findOne({ slug: pid });
  if (!product) throw new Error("Product is not found in database");
  return res.status(200).json(product);
});
module.exports = {
  getAllProduct,
  addProduct,
  addManyProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
};
