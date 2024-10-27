const mongoose = require("mongoose"); // Erase if already required
// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    discount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
    categoryApply: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Categories",
      },
    ],
    brandApply: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Brands",
      },
    ],
    collectionApply: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Collections",
      },
    ],
    productApply: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Products",
      },
    ],
    productNotApply: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Products",
      },
    ],
    brandNotApply: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Brands",
      },
    ],
    collectionNotApply: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Collections",
      },
    ],
    categoryNotApply: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Categories",
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    quantityMin: {
      type: Number,
      required: true,
    },
    quantityMax: {
      type: Number,
      required: true,
    },
    quantityUsed: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
//Export the model
module.exports = mongoose.model("Coupon", couponSchema);
