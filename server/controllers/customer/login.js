const Customer = require("../../models/customer");
const asyncHandler = require("express-async-handler");
const sendSMS = require("../../ultils/sendPhone");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middlewares/jwt");

const loginCustomer = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  // Check if the phone number exists
  const customer = await Customer.findOne({ phone });
  if (!customer) {
    res.status(400);
    throw new Error("Phone number not found");
  }
  // Check if the password is correct
  if (!(await customer.isCorrectPassword(password))) {
    res.status(400);
    throw new Error("Password is incorrect");
  }
  // Generate access token and refresh token
  const accessToken = generateAccessToken(customer._id);
  const refreshToken = generateRefreshToken(customer._id);
  // Save the refresh token to the database
  customer.refreshToken = refreshToken;
  await customer.save();
  // Return the response to the client
  res.status(200).json({
    mes: "Login successfully",
    success: true,
    data: {
      customer,
      accessToken,
      refreshToken,
    },
  });
});
module.exports = {
  loginCustomer,
};
