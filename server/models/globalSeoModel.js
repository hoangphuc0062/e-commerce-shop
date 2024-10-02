const mongoose = require("mongoose");

const globalSeoSchema = new mongoose.Schema({
  seoKeywords: {
    type: String,
    maxLength: 300,
    mixLength: 10,
  },
  seoTitle: {
    type: String,
    maxLength: 300,
    mixLength: 10,
  },
  metaDescription: {
    type: String,
    maxLength: 300,
    mixLength: 10,
  },
  seoDescription: {
    type: String,
    maxLength: 300,
    mixLength: 10,
  },
});

module.exports = mongoose.model("GlobalSeo", globalSeoSchema);
