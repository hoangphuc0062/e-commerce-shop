const Customer = require("../../models/customer");
const asyncHandler = require("express-async-handler");

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

  // Extract required details and create tokens
  const { _id, role } = customer;
  const accessToken = generateAccessToken(_id, role);
  const refreshToken = generateRefreshToken(_id);

  // Save the refresh token to the database
  await Customer.findByIdAndUpdate(_id, { refreshToken }, { new: true });

  // Set the refresh token as a cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  // Return the response to the client
  res.status(200).json(customer);
});

module.exports = {
  loginCustomer,
};
