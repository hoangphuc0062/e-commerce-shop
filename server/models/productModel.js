const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    SKU: {
      type: String,
      required: true,
    },
    historicalPrice: {
      type: Number,
    },
    priceInMarket: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    inventory: {
      type: Number, // số lượng tồn kho
    },
    onStock: {
      type: Number, // số lượng có thể bán
    },
    inComing: {
      type: Number, // số lượng hàng đang về
    },
    minInventory: {
      type: Number,
    },
    maxInventory: {
      type: Number,
    },
    unit: {
      type: String,
    },
    isBattery: {
      type: Boolean,
      default: true,
    },
    isStopSelling: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
    },
    description: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    keywords: {
      type: String,
    },
    titleSEO: {
      type: String,
    },
    descriptionSEO: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    videos: {
      type: String,
    },
    views: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouses",
    },
    tagsProduct: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tags",
      },
    ],
    attributes: {
      type: Map,
      of: String,
    },
    variants: [
      {
        type: Map,
        of: String,
      },
    ],
    filterable: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
