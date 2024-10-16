const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  titleSEO: {
    type: String,
  },
  descriptionSEO: {
    type: String,
  },
  keywordsSEO: {
    type: String,
  },
});

module.exports = mongoose.model("Series", seriesSchema);
