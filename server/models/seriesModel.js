const mongoose = require("mongoose");
const slugify = require("slugify");

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
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brands",
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

seriesSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});
seriesSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Series", seriesSchema);
