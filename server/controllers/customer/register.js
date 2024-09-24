const Customer = require("../../models/customer");
const asyncHandler = require("express-async-handler");
const sendSMS = require("../../ultils/sendPhone");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middlewares/jwt");

const registerCustomer = asyncHandler(async (req, res) => {
  const { phone, password, name } = req.body;

  // Check if the phone number already exists
  const existingCustomer = await Customer.findOne({ phone });
  if (existingCustomer) {
    res.status(400);
    throw new Error("Phone number already exists");
  }

  // Generate OTP
  const otp = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();

  // Create new customer
  const newCustomer = new Customer({
    phone,
    password,
    name,
    code: otp,
  });
  await newCustomer.save();

  // Send OTP via SMS
  try {
    const message = `OTP của bạn là ${otp}. Vui lòng không chia sẻ nó với bất kỳ ai khác.`;
    await sendSMS(phone, message);
    console.log(`OTP sent to ${phone}: ${otp}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Error sending OTP" });
  }

  // Generate tokens
  const { _id, role } = newCustomer;
  const accessToken = generateAccessToken(_id, role);
  const refreshToken = generateRefreshToken(_id);

  // Save refresh token to the customer object
  newCustomer.refreshToken = refreshToken;
  await newCustomer.save();

  // Set refresh token as a cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Return response to the client
  res.status(201).json(newCustomer);
});

module.exports = {
  registerCustomer,
};
