const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Brand = require("../models/brandModel");

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
    if (queries.multiFilter === "") delete formattedQueries.multiFilter;
    if (queries.multiFilter) {
      const filterString = decodeURIComponent(queries.multiFilter);

      const filterConditions = filterString.split("&");

      filterConditions.forEach((condition) => {
        const [key, value] = condition.split("=");

        if (!key || !value) {
          return res.status(400).json({ mes: "Invalid filter" });
        }

        if (key === "price") {
          const [minPrice, maxPrice] = value.split("-").map(Number);
          if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            formattedQueries.price = { $gte: minPrice, $lte: maxPrice };
          } else {
            return res.status(400).json({ mes: "Invalid price filter" });
          }
        } else {
          const values = value.split(",");

          if (values && values.length > 0) {
            // Khởi tạo $or nếu chưa tồn tại
            formattedQueries.$or = formattedQueries.$or || [];

            // Thêm các điều kiện vào $or
            const conditions = values.map((val) => ({
              [`filterable.${key}`]: { $regex: val, $options: "i" }, // Điều kiện regex (case-insensitive)
            }));

            formattedQueries.$or.push(...conditions);
          }
        }
      });
      delete formattedQueries.multiFilter;
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
  const data = req.body;

  if (!pid || Object.keys(data).length === 0) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }

  const product = await Product.findByIdAndUpdate(pid, data, {
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

// Search product by name
// const searchProduct = asyncHandler(async (req, res) => {
//   const { name } = req.query;
//   if (!name) {
//     return res.status(400).json({
//       mes: "Missing inputs",
//     });
//   }
//   const product = await Product.find({ name: { $regex: name, $options: "i" } });
//   if (!product) throw new Error("Product is not found in database");
//   return res.status(200).json(product);
// });

const updateManyProduct = asyncHandler(async (req, res) => {
  const { brandIds } = req.body; // Nhận mảng brandIds từ body

  if (!Array.isArray(brandIds) || brandIds.length === 0) {
    return res
      .status(400)
      .json({ message: "brandIds phải là một mảng hợp lệ." });
  }

  // Validate ObjectId
  // const validBrandIds = brandIds.filter((id) =>
  //   mongoose.Types.ObjectId.isValid(id)
  // );

  // Dữ liệu muốn cập nhật
  const refreshRates = "120Hz";
  const storages = "256GB, 512GB, 1TB";
  const rams = "8GB";
  const chips = "Apple-A-series";

  const filterable = {
    refreshRate: refreshRates,
    storage: storages,
    ram: rams,
    chip: chips,
  };

  // Cập nhật sản phẩm với tất cả brandId trong danh sách
  const result = await Product.updateMany(
    { brand: { $in: brandIds } }, // Lọc theo danh sách brandIds
    { $set: { filterable } }, // Dữ liệu cần cập nhật
    { new: true }
  );

  // Kiểm tra kết quả
  if (result.matchedCount === 0) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm nào với các brandId được cung cấp.",
    });
  }

  res.status(200).json({
    message: "Cập nhật sản phẩm thành công!",
    matchedCount: result.matchedCount, // Số lượng sản phẩm được tìm thấy
    modifiedCount: result.modifiedCount, // Số lượng sản phẩm thực sự được cập nhật
  });
});

module.exports = {
  getAllProduct,
  addProduct,
  addManyProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,

  updateManyProduct,
};
