const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
    },
    icon: {
      type: String,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    position: {
      type: Number,
      required: true,
      default: 0,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Categories", categorySchema);
