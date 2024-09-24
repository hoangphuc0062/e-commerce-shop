const asyncHandler = require("express-async-handler");
const crypto = require("crypto"); // Make sure you import crypto
const Customer = require("../../models/customer");

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;

  // Validate inputs
  if (!password || !token) throw new Error("Missing inputs");

  // Hash the provided reset token
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Find the customer with matching reset token and ensure token is not expired
  const customer = await Customer.findOne({
    passwordResetToken,
    passwordResetExprires: { $gt: Date.now() }, // Check if token is still valid
  });

  // If no customer is found or the token is expired
  if (!customer) throw new Error("Invalid or expired reset token");

  // Update the password and reset token fields
  customer.password = password;
  customer.passwordResetToken = undefined;
  customer.passwordChangedAt = Date.now();
  customer.passwordResetExprires = undefined;

  // Save the updated customer document
  await customer.save();

  // Send response
  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

module.exports = { resetPassword };
