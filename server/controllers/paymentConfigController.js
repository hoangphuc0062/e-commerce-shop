const asyncHandler = require("express-async-handler");

const PaymentConfig = require("../models/paymentconfigModel");

const getAllPaymentConfig = asyncHandler(async (req, res) => {
  const paymentConfigs = await PaymentConfig.find();
  return res.status(200).json(paymentConfigs);
});

const createPaymentConfig = asyncHandler(async (req, res) => {
  const { name, accountNumber, bank, bankBranch, accountOwner, note } =
    req.body;
  if (!name || !accountNumber || !bank || !bankBranch || !accountOwner) {
    return res.status(400).json({
      mes: "Name, accountNumber, bank, bankBranch, accountOwner are required",
    });
  }
  const paymentConfig = new PaymentConfig({
    name,
    accountNumber,
    bank,
    bankBranch,
    accountOwner,
    note,
  });
  await paymentConfig.save();
  return res.status(201).json({
    mes: "Payment Config added successfully",
  });
});

const updatePaymentConfig = asyncHandler(async (req, res) => {
  const { paymentConfigId } = req.params;

  if (!paymentConfigId || Object.keys(req.body).length === 0) {
    return res.status(400).json({ mes: "Missing data to update" });
  }

  const paymentConfig = await PaymentConfig.findByIdAndUpdate(
    paymentConfigId,
    req.body,
    { new: true }
  );

  if (!paymentConfig) {
    return res.status(400).json({ mes: "Payment Config not found" });
  }

  return res.status(200).json({
    mes: paymentConfig
      ? "Update Payment Config is successful"
      : "Some thing went wrong",
    paymentConfig,
  });
});

const deletePaymentConfig = asyncHandler(async (req, res) => {
  const { paymentConfigId } = req.params;

  if (!paymentConfigId) {
    return res.status(400).json({ mes: "Missing paymentConfigId" });
  }

  const paymentConfig = await PaymentConfig.findByIdAndDelete(paymentConfigId);

  if (!paymentConfig) {
    return res.status(400).json({ mes: "Payment Config not found" });
  }

  return res.status(200).json({
    mes: paymentConfig
      ? "Delete Payment Config is successful"
      : "Some thing went wrong",
    paymentConfig,
  });
});
module.exports = {
  getAllPaymentConfig,
  createPaymentConfig,
  updatePaymentConfig,
  deletePaymentConfig,
};
