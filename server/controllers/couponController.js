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
  const coupons = await Coupon.find({});
  res.json(coupons);
});
const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (!cid) {
    res.status(400);
    throw new Error("Invalid id");
  }
  const reponse = await Coupon.findByIdAndUpdate(cid, req.body);
  return res.json(reponse);
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
module.exports = {
  createNewCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};
