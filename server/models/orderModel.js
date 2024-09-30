const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
      count: {
        type: Number,
      },
      color: {
        type: String,
      },
      size: {
        type: Number,
      },
    },
  ],
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  coupon: {
    type: mongoose.Types.ObjectId,
    ref: "Coupon",
  },
  status: {
    type: String,
    default: "Processing",
    enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"],
  },
  total: {
    type: Number,
  },
  payment: {
    type: String,
    enum: ["cash", "momo", "zalopay", "vnpay"],
    default: "cash",
  },
  note: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
