const asyncHandler = require("express-async-handler");
const Customer = require("../../models/customer");

const updateCustomerBYAdmin = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }
  const customer = await Customer.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-refreshToken");
  return res.status(200).json(customer);
});
module.exports = { updateCustomerBYAdmin };
