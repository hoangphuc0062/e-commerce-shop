const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");

const getAllPost = asyncHandler(async (req, res) => {
  const sortBy = req.query.sort;
  const order = req.query.order === "asc" ? 1 : -1;
  const posts = await Post.find()
    .populate("author", "name avatar")
    .populate("category", "name slug")
    .populate("tags", "name")
    .populate({
      path: "rating",
      populate: {
        path: "customer",
        select: "name avatar",
      },
    });
  return res.status(200).json(posts);
});

const getPostBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    return res.status(400).json({ mes: "Missing slug" });
  }
  const post = await Post.findOne({ slug })
    .populate("author", "name avatar")
    .populate("category", "name slug")
    .populate("tags", "name")
    .populate({
      path: "rating",
      populate: {
        path: "customer",
        select: "name avatar",
      },
    });

  return res.status(200).json(post);
});

const getPostById = asyncHandler(async (req, res) => {
  const { bid } = req.params;

  if (!bid) {
    return res.status(400).json({ mes: "bid hasnt founded" });
  }
  const post = await Post.findById(bid)
    .populate("author", "name avatar")
    .populate("category", "name slug")
    .populate("tags", "name")
    .populate({
      path: "rating",
      populate: {
        path: "customer",
        select: "name avatar",
      },
    });
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
    tags,
    thumbnail,
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
    tags,
    thumbnail,
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

const ratingPosts = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, bid } = req.body;

  if (!star || !bid) throw new Error("Missing inputs");

  const ratingPosts = await Post.findById(bid);

  // Nếu không tìm thấy bài viết
  if (!ratingPosts) throw new Error("Post not found");

  // Lọc các rating hợp lệ (loại bỏ những rating có `customer` đã bị xóa)
  ratingPosts.rating = ratingPosts.rating.filter(async (el) => {
    const customerExists = await Customer.findById(el.customer);
    return customerExists !== null;
  });

  const alreadyRating = ratingPosts.rating.find(
    (el) => el.customer.toString() === _id.toString()
  );

  if (alreadyRating) {
    // Update star and comment
    await Post.updateOne(
      {
        rating: { $elemMatch: alreadyRating },
      },
      {
        $set: { "rating.$.star": star, "rating.$.comment": comment },
      },
      { new: true }
    );
  } else {
    // Add star and comment
    await Post.findByIdAndUpdate(
      bid,
      {
        $push: { rating: { star, comment, customer: _id } },
      },
      { new: true }
    );
  }

  // totalRating
  const updatePost = await Post.findById(bid);
  const ratingCount = updatePost.rating.length;
  const sumRating = updatePost.rating.reduce((sum, el) => sum + +el.star, 0);
  updatePost.totalRating = Math.round((sumRating * 10) / ratingCount) / 10;

  await updatePost.save();

  return res.status(200).json({
    mes: "Rating post is successful",
    updatePost,
  });
});

const deleteRating = asyncHandler(async (req, res) => {
  const { rid } = req.params;
  if (!rid) throw new Error("Missing rating id");

  const updatedPost = await Post.findOneAndUpdate(
    { "rating._id": rid },
    { $pull: { rating: { _id: rid } } },
    { new: true }
  );

  if (!updatedPost) {
    return res.status(404).json({ mes: "Rating not found" });
  }
  const totalRatings = updatedPost.rating.reduce((sum, r) => sum + r.star, 0);
  updatedPost.totalRating = totalRatings;

  await updatedPost.save();

  return res.status(200).json({
    mes: "Delete rating is successful",
    post: updatedPost,
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
  ratingPosts,
  deleteRating,
};
