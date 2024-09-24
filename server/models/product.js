const mongoose = require("mongoose");

const { type } = require("os");
var ProductSchema = new mongoose.Schema(
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
    weight: {
      type: Number,
    },
    isBattery: {
      type: Boolean,
      default: true,
    },
    isMain: {
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
    images: {
      type: String,
    },
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
          type: String,
        },
      },
    ],
    rating: {
      type: Number,
    },
    warranty: [
      {
        title: String,
        key: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
    attribute: [
      {
        name: String,
        value: String,
        typeOfValue: String,
      },
    ],
    gift: [
      {
        name: String,
        value: String,
        typeOfValue: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
