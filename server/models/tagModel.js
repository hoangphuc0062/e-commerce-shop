const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);
