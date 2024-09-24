const asyncHandler = require("express-async-handler");
const Customer = require("../../models/customer");
const sendSMS = require("../../ultils/sendPhone");

const forgotPassword = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  // Check if the phone number exists
  const customer = await Customer.findOne({ phone });
  if (!customer) {
    res.status(400);
    throw new Error("Phone number not found");
  }

  // Create a password reset token
  const resetToken = customer.createPasswordChangeToken();
  await customer.save(); // Save the customer with the token

  // Generate an OTP
  const otp = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();

  // Update the code field with the generated OTP
  await customer.updateCode(otp);

  // Message content with OTP
  const messages = `Mã OTP: ${otp}. Please do not share it with anyone else.`;

  try {
    // Send the OTP via SMS
    await sendSMS(phone, messages);
    console.log(`OTP sent to ${phone}: ${otp}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Error sending OTP" });
  }

  res.status(200).json(resetToken, customer);
});

module.exports = { forgotPassword };
