const mongoose = require("mongoose");

const bannerCollectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
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
    banner: [
      {
        name: {
          type: String,
          default: "",
        },
        urlImage: {
          type: String,
          required: true,
        },
        refUrl: {
          type: String,
          default: "",
        },
        position: {
          type: Number,
          default: 0,
        },
        shotDescription: {
          type: String,
          default: "",
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BannerCollection", bannerCollectionSchema);
