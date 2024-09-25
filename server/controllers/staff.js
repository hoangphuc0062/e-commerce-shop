const asyncHandler = require("express-async-handler");
const Staff = require("../models/staff");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");

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

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body.data;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }

  const response = await Staff.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, refreshToken, ...staffData } = response.toObject();

    // Tạo accessToken
    const accessToken = generateAccessToken(response._id, role);

    // Tạo refreshToken
    const newRefreshToken = generateRefreshToken(response._id);

    // Lưu refreshToken vào database
    await Staff.findByIdAndUpdate(
      response._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );

    // Lưu refreshToken vào cookie với httpOnly
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true, // Bảo mật hơn, không cho phép truy cập từ JS
      maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token tồn tại 7 ngày
    });
    res.cookie("role", role, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // Gửi accessToken qua JSON
    return res.status(200).json({
      success: true,
      mes: "Login success",
      data: {
        accessToken, // Token có thể được sử dụng trên client
        staffData,
        role,
      },
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  // ktr có cookie tồn tại chưa
  if (!cookie || !cookie.refreshToken)
    throw new Error("No Refresh Token in cookies");
  // xóa refresh token ở db
  await Staff.findOneAndUpdate(
    {
      refreshToken: cookie.refreshToken,
    },
    { refreshToken: "" },
    { new: true }
  );
  // xóa refresh token ở cookie trình duyệt
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout is done",
  });
});

module.exports = { login, logout, registerStaff };
