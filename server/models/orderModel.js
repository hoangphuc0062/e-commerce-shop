const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  products: [
    {
      pid: { type: mongoose.Types.ObjectId, ref: "Product" },
      attributeId: {
        type: String,
        default: null,
      },
      key: { type: String, default: null },
      quantity: { type: Number, default: 1 },
    },
  ],
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
  },
  staff: {
    type: mongoose.Types.ObjectId,
    ref: "Staff",
    default: null,
  },
  coupon: {
    type: mongoose.Types.ObjectId,
    ref: "Coupon",
    default: null,
  },
  status: {
    type: String,
    default: "Processing",
    enum: [
      "Pending",
      "Processing",
      "Shipping",
      "Delivered",
      "Cancelled",
      "Success",
    ],
  },
  total: {
    type: Number,
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "momo", "zalopay", "vnpay"],
    default: "cash",
  },
  statusPayment: {
    type: String,
    enum: ["Not paid", "Paid"],
    default: "Not paid",
  },
  shippingFee: {
    type: Number,
  },
  note: {
    type: String,
  },
  discount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  SKU: {
    type: String,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
