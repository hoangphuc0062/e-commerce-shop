const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");
const createNewCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) throw new Error("Missing inputs");
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
  });
  return res.json({
    success: response ? true : false,
    createdCoupon: response ? response : "Cannot create new coupon",
  });
});
const getCoupon = asyncHandler(async (req, res) => {
  const response = await Coupon.find().select("-createAt -updateAt");
  return res.json({
    success: response ? true : false,
    coupon: response ? response : "Cannot get new coupon",
  });
});
const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (Object.keys(req.body.length === 0)) throw new Error("Missing inputs");
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
  });
  return res.json({
    success: response ? true : false,
    updateCoupon: response ? response : "Cannot create new coupon",
  });
});
const deleteCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");

  const response = await Coupon.findByIdAndDelete(cid);
  return res.json({
    success: response ? true : false,
    deleteCoupon: response ? response : "Cannot delete coupon",
  });
});
module.exports = {
  createNewCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};
