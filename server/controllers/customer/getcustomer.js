const asyncHandler = require("express-async-handler");
const Customer = require("../../models/customer");

const getCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.find().select("-refreshToken");
  return res.status(200).json(customer);
});

module.exports = { getCustomer };
