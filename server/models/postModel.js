const mongoose = require("mongoose");
const slugify = require("slugify");

const postSchema = new mongoose.Schema(
  {
    postTitle: {
      type: String,
      required: true,
      maxlength: 100, // Giới hạn độ dài tối đa của postTitle là 100 ký tự
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    thumbnail: {
      type: String,
    },
    shortDescription: {
      type: String,
      maxlength: 200, // Giới hạn độ dài tối đa của shortDescription là 200 ký tự
    },
    metaDescription: {
      type: String,
      maxlength: 160, // Giới hạn độ dài tối đa của metaDescription là 160 ký tự
    },
    seoKeyWords: [
      {
        type: String,
      },
    ],
    shortSeoDescription: {
      type: String,
      maxlength: 160, // Giới hạn độ dài tối đa của shortSeoDescription là 160 ký tự
    },
    content: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    rating: [
      {
        customer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Customer",
        },
        star: {
          type: Number,
          min: 1,
          max: 5, // Giới hạn giá trị của star từ 1 đến 5
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
