const asyncHandler = require("express-async-handler");
const Staff = require("../models/staff");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");

const registerStaff = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const existingStaff = await Staff.findOne({ email });
  if (existingStaff) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const newStaff = new Staff({ email, password, name });
  await newStaff.save();
  res.status(201).json(newStaff);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }

  const response = await Staff.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, refreshToken, ...staffData } = response.toObject();

    const accessToken = generateAccessToken(response._id, role);

    const newRefreshToken = generateRefreshToken(response._id);

    await Staff.findByIdAndUpdate(
      response._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("role", role, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // Gửi accessToken qua JSON
    return res.status(200).json({
      mes: "Login success",
      accessToken,
      staffData,
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No Refresh Token in cookies");
  await Staff.findOneAndUpdate(
    {
      refreshToken: cookie.refreshToken,
    },
    { refreshToken: "" },
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    mes: "Logout is done",
  });
});

module.exports = { login, logout, registerStaff };
