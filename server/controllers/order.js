const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate(
    "orderBy",
    "firstname lastname avatar email"
  );
  return res.status(200).json({
    success: true,
    orders: orders,
  });
});

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon, shippingFee } = req.body;

  const userCart = await User.findById(_id)
    .select("cart")
    .populate("cart.pid", "name price");

  let products = [];
  var total = 0;

  if (userCart) {
    products = userCart.cart.map((el) => ({
      id: el.pid._id,
      count: el.quantity,
      color: el.color,
      size: el.size,
    }));

    total = userCart.cart.reduce(
      (sum, el) => Number(el.price) * Number(el.quantity) + sum,
      0
    );
  }

  if (shippingFee) {
    total = Number(total) + Number(shippingFee);
  }

  let createData = { products, total, payment: "cash", orderBy: _id };

  if (coupon) {
    const selectCoupon = await Coupon.findById(coupon);
    if (selectCoupon) {
      total =
        Math.round((total * (1 - selectCoupon.discount / 100)) / 1000) * 1000;
      createData = { ...createData, total, coupon };
    }
  }

  const rs = await Order.create(createData);
  if (rs) {
    await User.findByIdAndUpdate(_id, { $set: { cart: [] } }, { new: true });
  }

  return res.status(200).json({
    success: !!rs,
    rs: rs || "Some thing went wrong",
  });
});
const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing status");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    response: response ? response : "Some thing went wrong",
  });
});

module.exports = {
  getAllOrder,
  createOrder,
  updateStatus,
};
