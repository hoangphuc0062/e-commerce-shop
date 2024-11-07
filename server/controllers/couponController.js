const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");

const createNewCoupon = asyncHandler(async (req, res) => {
  const {
    name,
    code,
    discount,
    description,
    startDate,
    endDate,
    type,
    categoryApply,
    brandApply,
    collectionApply,
    productApply,
    productNotApply,
    brandNotApply,
    collectionNotApply,
    categoryNotApply,
    quantity,
    quantityMin,
    quantityMax,
    quantityUsed,
    status,
  } = req.body;
  const coupon = new Coupon({
    name,
    code,
    discount,
    description,
    startDate,
    endDate,
    type,
    categoryApply,
    brandApply,
    collectionApply,
    productApply,
    productNotApply,
    brandNotApply,
    collectionNotApply,
    categoryNotApply,
    quantity,
    quantityMin,
    quantityMax,
    quantityUsed,
    status,
  });
  const createdCoupon = await coupon.save();
  res.status(201).json(createdCoupon);
});

const getCoupon = asyncHandler(async (req, res) => {
  const sortBy = req.query.sort;
  const order = req.query.order === "asc" ? 1 : -1;
  const coupons = await Coupon.find({}).sort({ [sortBy]: order });
  res.json(coupons);
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (!cid) {
    res.status(400);
    throw new Error("Invalid id");
  }
  const rs = await Coupon.findByIdAndUpdate(cid, req.body, {
    new: true,
  });
  return res.json(rs);
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (!cid) {
    res.status(400);
    throw new Error("Invalid id");
  }
  const reponse = await Coupon.findByIdAndDelete(cid);
  return res.json(reponse);
});

const getCouponById = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (!cid) {
    res.status(400);
    throw new Error("Invalid id");
  }
  const reponse = await Coupon.findById(cid);
  return res.json(reponse);
});

module.exports = {
  createNewCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponById,
};
