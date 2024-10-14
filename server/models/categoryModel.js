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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Icons",
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Categories", categorySchema);
