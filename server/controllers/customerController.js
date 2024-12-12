const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");
const Product = require("../models/productModel");

const crypto = require("crypto");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const sendSMS = require("../ultils/sendPhone");
const sendMail = require("../ultils/sendMail");
const makeToken = require("uniquid");

const checkOTP = asyncHandler(async (req, res) => {
  const { phone, code } = req.body;

  const customer = await Customer.findOne({ phone });
  if (!customer) {
    res.status(400);
    throw new Error("Phone number not found");
  }
  if (customer.code !== code) {
    res.status(400);
    throw new Error("OTP is incorrect");
  }
  customer.isBlocked = false;
  await customer.save();
  res.status(200).json({
    mes: "OTP is correct",
  });
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const customer = await Customer.findByIdAndDelete(_id);
  if (!customer) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }
  return res.status(200).json({
    message: "Customer deleted successfully",
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  const customer = await Customer.findOne({ phone });
  if (!customer) {
    res.status(400);
    throw new Error("Phone number not found");
  }

  const resetToken = customer.createPasswordChangeToken();

  await customer.save(); // Save the customer with the token

  // Generate an OTP
  const otp = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();

  // Update the code field with the generated OTP
  await customer.updateCode(otp);

  // Message content with OTP
  const messages = `Mã OTP: ${otp}. Vui lòng không chia sẻ mã này với ai. Mã sẽ hết hạn trong 15 phút`;

  try {
    // Send the OTP via SMS
    await sendSMS(phone, messages);
    console.log(`OTP sent to ${phone}: ${otp}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Error sending OTP" });
  }

  // Send the response with resetToken and customer
  res.status(200).json({ resetToken, customer });
});

const getCustomer = asyncHandler(async (req, res) => {
  const sortBy = req.query.sort;
  const order = req.query.order === "asc" ? 1 : -1;
  const customers = await Customer.find()
    .select("-refreshToken -role -password -passwordResetToken ")
    .sort({ [sortBy]: order });
  return res.status(200).json(customers);
});

const getCurrentCustomer = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    return res.status(400).json({
      message: "Missing _id",
    });
  }

  const customer = await Customer.findById(_id).select(
    "-role -refreshToken -password -passwordResetToken -passwordResetExprires "
  );

  return res
    .status(200)
    .json({ rs: customer ? customer : "Customer is not founded" });
});

const getCustomerByCookie = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(400).json({
      message: "Missing refresh token",
    });
  }

  const customer = await Customer.findOne({ refreshToken }).select(
    "-role -refreshToken -password -passwordResetToken -passwordResetExprires "
  );

  return res.status(200).json(customer);
});

const loginCustomer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the phone number exists
  const customer = await Customer.findOne({ email }).select(
    "-code  -resetPasswordToken -resetPasswordExpires -passwordResetExprires -passwordResetToken -refreshToken"
  );
  if (!customer) {
    res.status(400);
    throw new Error("email not found");
  }

  // Check if the password is correct
  if (!(await customer.isCorrectPassword(password))) {
    res.status(400);
    throw new Error("Password is incorrect");
  }

  // Extract required details and create tokens
  const {
    password: _,
    memberShipType,
    birthday,
    refreshToken: oldRefreshToken,
    ...customerData
  } = customer.toObject();

  const accessToken = generateAccessToken(customer._id, memberShipType);
  const newRefreshToken = generateRefreshToken(customer._id);

  // Save the new refresh token to the database
  await Customer.findByIdAndUpdate(
    customer._id,
    { refreshToken: newRefreshToken },
    { new: true }
  );

  // Set the refresh token as a cookie
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  // Return the response to the client
  res.status(200).json({
    mes: "Login success",
    accessToken,
    customer: { ...customerData, birthday }, // Include the birthday field in the response
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  // ktr có cookie tồn tại chưa
  if (!cookie || !cookie.refreshToken)
    throw new Error("No Refresh Token in cookies");
  // xóa refresh token ở db
  await Customer.findOneAndUpdate(
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
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    mes: "Logout is done",
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
  const response = await Customer.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token is not matched ",
  });
});

const registerCustomer = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }

  const user = await Customer.findOne({ email: email });
  if (user) throw new Error("User has already existed");
  else {
    const token = makeToken();
    // rest of your code...
    res.cookie(
      "dataregister",
      { ...req.body, token },
      {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      }
    );

    const html = `Xin vui lòng click vào link dưới đây để hoàn tất quá trình đăng ký của bạn link này sẽ hết hạn sau 15 phút kể từ bây giờ.
      <a href=${process.env.URL_SERVER}/api/customers/finalregister/${token}>Xác nhận tài khoản</a>`;
    const subject = `Hoàn tất đăng ký Voi Tây Nguyên Account`;

    const rs = await sendMail(email, html, subject);

    return res
      .status(200)
      .json({ mes: "Please check your email to active account" });
  }
});

const finalRegister = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const { token } = req.params;

  if (!cookie || !cookie.dataregister || cookie.dataregister.token !== token) {
    res.clearCookie("dataregister");
    return res.redirect(`${process.env.WEB_URL}/finalregister/failed`);
  }
  const newUser = await Customer.create({
    email: cookie.dataregister.email,
    password: cookie.dataregister.password,
    name: cookie.dataregister.name,
    isBlocked: false,
  });
  res.clearCookie("dataregister");
  if (newUser) {
    return res.redirect(`${process.env.WEB_URL}/finalregister/success`);
  } else {
    return res.redirect(`${process.env.WEB_URL}/finalregister/failed`);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;

  // Validate inputs
  if (!password || !token) throw new Error("Missing inputs");

  // Hash the provided reset token
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Find the customer with matching reset token and ensure token is not expired
  const customer = await Customer.findOne({
    passwordResetToken,
    passwordResetExprires: { $gt: Date.now() }, // Check if token is still valid
  });

  // If no customer is found or the token is expired
  if (!customer) throw new Error("Invalid or expired reset token");

  // Update the password and reset token fields
  customer.password = password;
  customer.passwordResetToken = undefined;
  customer.passwordChangedAt = Date.now();
  customer.passwordResetExprires = undefined;

  // Save the updated customer document
  await customer.save();

  // Send response
  return res.status(200).json({
    message: "Password updated successfully",
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const customer = await Customer.findById(req.user._id).select("password");
  // Check if the current password is correct
  if (!(await customer.isCorrectPassword(currentPassword))) {
    return res.status(400).json({ mes: "Current password is incorrect" });
  }

  // Update the password
  customer.password = newPassword;
  await customer.save();

  return res.status(200).json({ mes: "Password updated successfully" });
});

const updateCustomer = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  if (!_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }
  const customer = await Customer.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  return res.status(200).json(customer);
});

const updateCustomerBYAdmin = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }
  const customer = await Customer.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-refreshToken");
  return res.status(200).json(customer);
});

const addCart = asyncHandler(async (req, res) => {
  const { productId, attributeId, quantity, key } = req.body;
  const customer = await Customer.findById(req.user._id);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const updatedCart = await customer.addToCart(
    productId,
    attributeId,
    quantity,
    key
  );
  return res.status(200).json(updatedCart);
});

// get cart
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const customer = await Customer.findById(userId).populate({
    path: "cart.pid",
    select: "name thumbnail price slug variants",
  });

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  const cart = customer.cart.map((item) => {
    const product = item.pid;

    console.log("Product:", product.variants);

    const variant = product.variants?.find((v) => {
      if (v instanceof Map) {
        return v.get("key") === item.key;
      } else {
        return v.key === item.key;
      }
    });
    let variantValue;
    if (variant instanceof Map) {
      const values = variant.get("values");
      if (values) {
        variantValue = values.find((v) => v.id === item.attributeId);
      }
    } else {
      variantValue = variant?.values?.find((v) => v.id === item.attributeId);
    }

    return {
      productId: product._id,
      name: product.name,
      thumbnail: variantValue?.thumbnail || product.thumbnail,
      price: variantValue?.price || variant?.price || product.price,
      slug: product.slug,
      attributeValue: variantValue,
      quantity: item.quantity,
      key: item.key,
    };
  });

  res.status(200).json(cart);
});

const updateCart = asyncHandler(async (req, res) => {
  const items = req.body; // Expecting an array of items
  const userId = req.user._id;

  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid input, expected a non-empty array of items" });
  }

  const customer = await Customer.findById(userId);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  try {
    // Update the customer's cart
    await customer.updateCart(items);

    res.status(200).json({
      message: "Cart updated successfully",
      cart: customer.cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update cart", error: error.message });
  }
});

// xoá cart
const deleteCartItem = asyncHandler(async (req, res) => {
  const { productId, attributeId } = req.body;
  const userId = req.user._id;

  // Find the customer's cart
  const customer = await Customer.findById(userId);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  // Find the index of the item to be removed
  const cartItemIndex = customer.cart.findIndex(
    (item) =>
      item.pid.toString() === productId.toString() &&
      item.attributeId === attributeId
  );

  if (cartItemIndex > -1) {
    // Remove the item from the cart
    customer.cart.splice(cartItemIndex, 1);

    // Save the updated cart
    await customer.save();

    res.status(200).json({
      message: "Cart item removed successfully",
      cart: customer.cart,
    });
  } else {
    res.status(404).json({ message: "Item not found in cart" });
  }
});

const deleteManyCart = asyncHandler(async (req, res) => {
  const items = req.body;
  const userId = req.user._id;

  if (!Array.isArray(items)) {
    return res
      .status(400)
      .json({ message: "Invalid input, expected an array of items" });
  }
  const customer = await Customer.findById(userId);
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  const itemsToDelete = new Set(
    items.map((item) => `${item.productId}-${item.attributeId}`)
  );

  customer.cart = customer.cart.filter(
    (item) => !itemsToDelete.has(`${item.pid.toString()}-${item.attributeId}`)
  );

  await customer.save();

  res.status(200).json({
    message: "Cart items removed successfully",
    cart: customer.cart,
  });
});

const createAddress = asyncHandler(async (req, res) => {
  const { street, wards, districts, provinces, isDefault } = req.body;
  const userId = req.user._id;

  try {
    if (isDefault) {
      // Gỡ trạng thái mặc định của địa chỉ hiện tại (nếu có)
      await Customer.updateOne(
        { _id: userId, "address.isDefault": true },
        { $set: { "address.$.isDefault": false } }
      );
    }

    // Thêm địa chỉ mới
    const newAddress = { street, wards, districts, provinces, isDefault };
    await Customer.updateOne(
      { _id: userId },
      { $push: { address: newAddress } }
    );

    res.status(201).json({ message: "Thêm địa chỉ thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Lỗi khi thêm địa chỉ mới: ${error.message}` });
  }
});

const updateAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const { street, wards, districts, provinces, isDefault } = req.body;
  const userId = req.user._id;

  try {
    if (isDefault) {
      // Gỡ trạng thái mặc định của địa chỉ hiện tại (nếu có)
      await Customer.updateOne(
        { _id: userId, "address.isDefault": true },
        { $set: { "address.$.isDefault": false } }
      );
    }

    // Cập nhật địa chỉ cụ thể
    const updatedCustomer = await Customer.updateOne(
      { _id: userId, "address._id": addressId },
      {
        $set: {
          "address.$.street": street,
          "address.$.wards": wards,
          "address.$.districts": districts,
          "address.$.provinces": provinces,
          "address.$.isDefault": isDefault,
        },
      }
    );

    if (updatedCustomer.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy địa chỉ cần cập nhật" });
    }

    res.status(200).json({ message: "Cập nhật địa chỉ thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Lỗi khi cập nhật địa chỉ: ${error.message}` });
  }
});

const deleteAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const userId = req.user._id;

  try {
    const updatedCustomer = await Customer.updateOne(
      { _id: userId },
      { $pull: { address: { _id: addressId } } }
    );

    if (updatedCustomer.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy địa chỉ cần xóa" });
    }

    res.status(200).json({ message: "Xóa địa chỉ thành công" });
  } catch (error) {
    res.status(500).json({ error: `Lỗi khi xóa địa chỉ: ${error.message}` });
  }
});

const getAddresses = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const customer = await Customer.findById(userId).select("address");

    if (!customer) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }

    res.status(200).json(customer.address);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Lỗi khi lấy danh sách địa chỉ: ${error.message}` });
  }
});

module.exports = {
  checkOTP,
  changePassword,
  deleteCustomer,
  forgotPassword,
  getCustomer,
  getCurrentCustomer,
  loginCustomer,
  logout,
  refreshAccessToken,
  registerCustomer,
  finalRegister,
  resetPassword,
  updateCustomer,
  updateCustomerBYAdmin,
  getCustomerByCookie,
  addCart,
  getCart,
  updateCart,
  deleteCartItem,
  deleteManyCart,

  createAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
};
