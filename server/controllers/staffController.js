const asyncHandler = require("express-async-handler");
const Staff = require("../models/staffModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const sendMail = require("../ultils/sendMail");
const crypto = require("crypto");
const makeToken = require("uniquid");

const registerStaff = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const { email } = req.body;

  const existingStaff = await Staff.findOne({ email });
  if (existingStaff) {
    return res.status(400).json({ mes: "Staff already exists" });
  }

  const newStaff = new Staff(req.body);
  await newStaff.save();
  res.status(201).json(newStaff);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mes: "Missing inputs" });
  }

  const staff = await Staff.findOne({ email });

  if (staff && (await staff.isCorrectPassword(password))) {
    const { password, role, refreshToken, ...staffData } = staff.toObject();

    const accessToken = generateAccessToken(staff._id, role);
    const newRefreshToken = generateRefreshToken(staff._id);

    await Staff.findByIdAndUpdate(
      staff._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );

    // Set cookies
    const cookieOptions = {
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    res.cookie("refresh_Token", newRefreshToken, cookieOptions);

    res.cookie("access_Token", accessToken, {
      ...cookieOptions,
      httpOnly: false,
    });

    // Role-based cookie settings
    const roleMapping = {
      0: "010101",
      1: "101010",
      2: "202020",
      3: "303030",
    };

    if (role in roleMapping) {
      res.cookie("role", roleMapping[role], {
        ...cookieOptions,
        httpOnly: false, // role cookies are accessible by client
      });
    }

    // Return success response
    return res.status(200).json({
      mes: "Login success",
      accessToken,
      staffData,
    });
  } else {
    return res.status(401).json({ mes: "Invalid credentials!" });
  }
});

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(400).json({ error: "No Refresh Token in cookies" });
  }

  // Find the staff by refreshToken and clear it
  const staff = await Staff.findOneAndUpdate(
    { refreshToken },
    { refreshToken: "" },
    { new: true }
  );

  if (!staff) {
    return res.status(404).json({ error: "Staff not found" });
  }

  // Clear relevant cookies individually
  res.clearCookie("refresh_Token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict", // Optional but improves security
  });
  res.clearCookie("access_Token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.clearCookie("role", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Logout successful" });
});

const getStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.find({});
  return res.status(200).json(staff);
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
  const response = await Staff.findByIdAndUpdate(sid, req.body, {
    new: true,
  });
  return res.status(200).json({
    mes: "Update success",
    response,
  });
});

const deleteStaff = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  const currentUserId = req.user._id;

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
  return res.status(200).json({ mes: "Delete success" });
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
  <a href=${process.env.DASHBOARD_URL}/reset-password/${resetToken}>Click here</a>`;
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

const getStaffCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const staff = await Staff.findById(_id).select(
    "-password -passwordResetExprires -passwordResetToken -refreshToken"
  );
  if (staff) {
    return res.status(200).json(staff);
  } else {
    res.status(404);
    throw new Error("Staff not found");
  }
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
  getStaffCurrent,
};
