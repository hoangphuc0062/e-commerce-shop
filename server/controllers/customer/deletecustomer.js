const asyncHandler = require("express-async-handler");
const Customer = require("../../models/customer");

const deleteCustomer = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const customer = await Customer.findByIdAndDelete(_id);
  if (!customer) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Customer deleted successfully",
  });
});
module.exports = { deleteCustomer };
