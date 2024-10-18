const mongoose = require("mongoose");

const { type } = require("os");

const attributeSchema = new mongoose.Schema({
  aid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attribute",
    required: true,
  },
  value: {
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
  priceInStore: {
    type: Number,
    required: true,
  },
  priceOnline: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  onStock: {
    type: Number,
  },
  unit: {
    type: String,
  },
  minInventory: {
    type: Number,
  },
  maxInventory: {
    type: Number,
  },
  avatar: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
});

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
    inStock: {
      type: Number, // số lượng tồn kho
    },
    onStock: {
      type: Number, // số lượng có thể bán
    },
    inComing: {
      type: Number, // số lượng hàng đang về
    },
    unit: {
      type: String,
    },
    minInventory: {
      type: Number,
    },
    maxInventory: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    isBattery: {
      type: Boolean,
      default: true,
    },
    isStopSelling: {
      type: Boolean,
      default: false,
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
    status: {
      type: String,
    },
    specifications: [
      {
        title: String,
        key: {
          type: String,
        },
        value: {
          type: mongoose.Mixed,
        },
      },
    ],
    views: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    gifts: [
      {
        name: String,
        value: String,
        typeOfValue: String,
      },
    ],
    series: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouses",
    },
    attributes: [attributeSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
