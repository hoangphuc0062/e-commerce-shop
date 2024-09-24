const asyncHandler = require("express-async-handler");
const Customer = require("../../models/customer");

const checkOTP = asyncHandler(async (req, res) => {
  const { phone, code } = req.body;
  console.log(phone, code);
  const customer = await Customer.findOne({ phone });
  if (!customer) {
    res.status(400);
    throw new Error("Phone number not found");
  }
  if (customer.code !== code) {
    console.log(customer.code);
    res.status(400);
    throw new Error("OTP is incorrect");
  }
  customer.isBlocked = false;
  await customer.save();
  res.status(200).json({
    mes: "OTP is correct",
    success: true,
  });
});

module.exports = { checkOTP };
