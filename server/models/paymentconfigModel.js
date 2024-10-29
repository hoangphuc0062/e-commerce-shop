const mongoose = require("mongoose");

const paymentConfigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  bankBranch: {
    type: String,
    required: true,
  },
  accountOwner: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

module.exports = mongoose.model("PaymentConfig", paymentConfigSchema);
