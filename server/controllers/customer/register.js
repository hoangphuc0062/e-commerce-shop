const Customer = require("../../models/customer");
const asyncHandler = require("express-async-handler");
const sendSMS = require("../../ultils/sendPhone");

const registerCustomer = asyncHandler(async (req, res) => {
  const { phone, password, name } = req.body;

  // Check if the phone number already exists
  const customer = await Customer.findOne({ phone });
  if (customer) {
    res.status(400);
    throw new Error("Phone number already exists");
  }
  const otp = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();
  // Create new customer
  const newCustomer = new Customer({
    phone,
    password,
    name,
    code: otp,
  });
  await newCustomer.save();

  // Generate OTP

  try {
    const messages = `OTP của bạn là ${otp}. Vui lòng không chia sẻ nó với bất kỳ ai khác.`;
    await sendSMS(phone, messages);
    console.log(`OTP sent to ${phone}: ${otp}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP" });
    return;
  }
  // Return the response to the client
  res.status(201).json({
    mes: "Customer created successfully",
    data: newCustomer,
    success: true,
  });
});

module.exports = {
  registerCustomer,
};
