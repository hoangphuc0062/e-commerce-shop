const Staff = require("../../models/staff");
const asyncHandler = require("express-async-handler");
const registerStaff = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  // Check if the email already exists
  const existingStaff = await Staff.findOne({ email });
  if (existingStaff) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const newStaff = new Staff({
    email,
    password,
    name,
  });
  await newStaff.save();
  res.status(201).json(newStaff);
});

module.exports = {
  registerStaff,
};
