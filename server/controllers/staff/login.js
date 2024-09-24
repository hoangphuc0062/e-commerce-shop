const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middlewares/jwt");
const Staff = require("../../models/staff");
const asyncHandler = require("express-async-handler");
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }

  // refresh token => cap moi access Token
  // access Token : xac thuc nguoi dung , phan quyen nguoi dung
  const response = await Staff.findOne({ email });
  //plain object
  if (response && (await response.isCorrectPassword(password))) {
    // tach pw và role ra khỏi response
    const { password, role, refreshToken, ...userData } = response.toObject();
    // tạo accessToken
    const accessToken = generateAccessToken(response._id, role);
    // tạo refreshToken
    const newRefreshToken = generateRefreshToken(response._id);
    // Lưu refresh token vào database
    await Staff.findByIdAndUpdate(
      response._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );
    // Lưu refresh token vào cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("Invalid credentials !");
  }
});

module.exports = { login };
