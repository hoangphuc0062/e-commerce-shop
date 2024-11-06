const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");

const getAllPost = asyncHandler(async (req, res) => {
  const sortBy = req.query.sort;
  const order = req.query.order === "asc" ? 1 : -1;
  const posts = await Post.find()
    .populate("author", "name")
    .populate("category", "name slug");
  return res
    .status(200)
    .json(posts)
    .sort({ [sortBy]: order });
});

const getPostBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    return res.status(400).json({ mes: "Missing slug" });
  }
  const post = await Post.findOne({ slug })
    .populate("author", "name")
    .populate("category", "name slug");
  return res.status(200).json(post);
});

const getPostById = asyncHandler(async (req, res) => {
  const { bid } = req.params;

  if (!bid) {
    return res.status(400).json({ mes: "bid hasnt founded" });
  }
  const post = await Post.findById(bid)
    .populate("author", "name")
    .populate("category", "name slug");
  return res.status(200).json(post);
});

const addPost = asyncHandler(async (req, res) => {
  const {
    postTitle,
    shortDescription,
    content,
    category,
    slug,
    seoKeyWords,
    metaDescription,
  } = req.body;
  const staff_id = req.user._id;

  if (!postTitle || !shortDescription || !content || !category) {
    return res.status(400).json({ mes: "Missing inputs" });
  }

  if (!staff_id) {
    return res.status(400).json({ mes: "Missing author id" });
  }
  const post = await Post.create({
    postTitle,
    shortDescription,
    content,
    author: staff_id,
    category,
    slug,
    seoKeyWords,
    metaDescription,
  });
  return res.status(200).json({ mes: "Create a post successful", post });
});

const updatePost = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }

  const post = await Post.findByIdAndUpdate(bid, req.body, { new: true });
  return res.status(200).json({
    mes: post ? "Update post is successful" : "Some thing went wrong",
    post,
  });
});

const deletePost = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid) {
    return res.status(400).json({
      mes: "Missing id",
    });
  }
  const post = await Post.findByIdAndDelete(bid);
  return res.status(200).json({
    mes: post ? "Delete post is successful" : "Some thing went wrong",
  });
});

const deleteManyPost = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids) {
    return res.status(400).json({
      mes: "Missing ids",
    });
  }
  const post = await Post.deleteMany({ _id: { $in: ids } });
  return res.status(200).json({
    mes: post ? "Delete posts is successful" : "Some thing went wrong",
  });
});
module.exports = {
  getAllPost,
  getPostBySlug,
  getPostById,
  addPost,
  updatePost,
  deletePost,
  deleteManyPost,
};
