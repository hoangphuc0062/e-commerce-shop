const asyncHandler = require("express-async-handler");
const Staff = require("../models/staff");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../ultils/sendMail");

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

const getStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.find({});
  res.json(staff);
});

const getStaffById = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  if (!sid) throw new Error("Missing inputs");
  const staff = await Staff.findById(sid);
  if (staff) {
    res.json(staff);
  } else {
    res.status(404);
    throw new Error("Staff not found");
  }
});

const updateStaff = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  if (!sid) throw new Error("Missing inputs");
  const response = await Staff.findByIdAndUpdate(sid, req.body, { new: true });
  return res.status(200).json({
    mes: "Update success",
    response,
  });
});

const deleteStaff = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  const currentUserId = req.user._id; // Assuming the logged-in user's ID is stored in req.user

  if (!sid) {
    throw new Error("Missing inputs");
  }

  // Prevent deleting yourself
  if (sid.toString() === currentUserId.toString()) {
    return res.status(400).json({ mes: "You cannot delete yourself" });
  }

  const staff = await Staff.findById(sid);
  if (!staff) {
    res.status(404);
    throw new Error("Staff not found");
  }

  const response = await Staff.findByIdAndDelete(sid);
  return res.status(200).json({
    mes: "Delete success",
    response,
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // Lấy token từ cookie
  const cookie = req.cookies;

  // Check xem nó có tồn tại hay không
  if (!cookie && !cookie.refreshToken)
    throw new Error("No Refresh Access Token");
  // Check token có hợp lệ hay không
  // rs = result
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await Staff.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token is not matched ",
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing email");
  const staff = await Staff.findOne({ email });
  if (!staff) throw new Error("User not found");
  const resetToken = staff.createPasswordChangeToken();
  await staff.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
  <a href=${process.env.DASHBOARD_URL}/dashboard/reset-password/${resetToken}>Click here</a>`;
  const subject = `Forgot password`;
  const rs = await sendMail(email, html, subject);
  return res.status(200).json({
    success: true,
    rs,
  });
});
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missing inputs");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const staff = await Staff.findOne({
    passwordResetToken,
    passwordResetExprires: { $gt: Date.now() },
  });
  // lưu vào db
  if (!staff) throw new Error("Invalid reset token");
  staff.password = password;
  staff.passwordResetToken = undefined;
  staff.passwordChangedAt = Date.now();
  staff.passwordResetExprires = undefined;
  await staff.save();
  return res.status(200).json({
    success: staff ? true : false,
    mes: staff ? " Update password" : "Something went wrong",
  });
});

module.exports = {
  login,
  logout,
  registerStaff,
  getStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
};
