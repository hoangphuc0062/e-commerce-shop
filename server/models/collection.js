const mongoose = require("mongoose");
const slugify = require("slugify");

const collectionSchema = new mongoose.Schema({
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
    ref: "Brand",
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

collectionSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});
collectionSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Collection", collectionSchema);
