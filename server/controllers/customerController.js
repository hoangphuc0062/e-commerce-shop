const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");

const crypto = require("crypto");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const sendSMS = require("../ultils/sendPhone");

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
  const { phone, password } = req.body;

  // Check if the phone number exists
  const customer = await Customer.findOne({ phone }).select(
    "-code -isBlocked -resetPasswordToken -resetPasswordExpires -passwordResetExprires -passwordResetToken -refreshToken"
  );
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
  const { phone, password, name } = req.body;

  // Check if the phone number already exists
  const existingCustomer = await Customer.findOne({ phone });
  if (existingCustomer) {
    res.status(400);
    throw new Error("Phone number already exists");
  }

  // Generate OTP
  const otp = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();

  // Create new customer
  const newCustomer = new Customer({
    phone,
    password,
    name,
    code: otp,
  });
  await newCustomer.save();

  // Send OTP via SMS
  try {
    const message = `OTP của bạn là ${otp}. Vui lòng không chia sẻ nó với bất kỳ ai khác.`;
    await sendSMS(phone, message);
    console.log(`OTP sent to ${phone}: ${otp}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Error sending OTP" });
  }

  // Generate tokens
  const { _id, role } = newCustomer;
  const accessToken = generateAccessToken(_id, role);
  const refreshToken = generateRefreshToken(_id);

  // Save refresh token to the customer object
  newCustomer.refreshToken = refreshToken;
  await newCustomer.save();

  // Set refresh token as a cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Return response to the client
  res.status(201).json({
    mes: "Register success",
    accessToken,
    customer: newCustomer,
  });
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

const updateCustomer = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }
  const customer = await Customer.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-role -refreshToken");
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
  const { productId, attributeId, quantity } = req.body;
  const customer = await Customer.findById(req.user._id);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  const updatedCart = await customer.addToCart(
    productId,
    attributeId,
    quantity
  );
  res.status(200).json({
    message: "Product with variant added to cart",
    cart: updatedCart,
  });
});

// get cart
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming `req.user` contains authenticated user data

  // Find the customer's cart and populate the product details
  const customer = await Customer.findById(userId).populate({
    path: "cart.pid", // Populate main product details
    select: "name thumbnail price slug attributes", // Include attributes for manual lookup
  });

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  // Process the cart items to include specific attribute details
  const cartWithAttributes = customer.cart.map((cartItem) => {
    const product = cartItem.pid;
    const attribute = product.attributes.find(
      (attr) => attr._id.toString() === cartItem.attributeId.toString()
    );

    return {
      productId: product._id,
      name: product.name,
      thumbnail: product.thumbnail,
      price: product.price,
      slug: product.slug,
      quantity: cartItem.quantity,
      attribute: attribute
        ? {
            _id: attribute._id,
            value: attribute.value,
            price: attribute.price,
            images: attribute.images,
          }
        : null, // If attribute not found, set to null
    };
  });

  // Send back the cart with populated attribute details
  res.status(200).json({
    message: "Cart retrieved successfully",
    cart: cartWithAttributes,
  });
});

// update cart
const updateCart = asyncHandler(async (req, res) => {
  const items = req.body; // Expecting an array of items directly
  const userId = req.user._id;

  // Find the customer's cart
  const customer = await Customer.findById(userId);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  items.forEach(({ productId, attributeId, quantity }) => {
    // Check if the item with the given productId and attributeId already exists in the cart
    const cartItemIndex = customer.cart.findIndex(
      (item) =>
        item.pid.toString() === productId.toString() &&
        item.attributeId.toString() === attributeId.toString()
    );

    if (cartItemIndex > -1) {
      // If the item exists, update its quantity
      if (quantity > 0) {
        customer.cart[cartItemIndex].quantity = quantity;
      } else {
        // If quantity is 0, remove the item from the cart
        customer.cart.splice(cartItemIndex, 1);
      }
    } else {
      if (quantity > 0) {
        customer.cart.push({
          pid: productId,
          attributeId: attributeId,
          quantity: quantity,
        });
      } else {
        return res.status(400).json({ message: "Invalid quantity" });
      }
    }
  });

  // Save the updated cart
  await customer.save();

  res.status(200).json({
    message: "Cart updated successfully",
    cart: customer.cart,
  });
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
      item.attributeId.toString() === attributeId.toString()
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

// xoas cart nhieu
const deleteManyCart = asyncHandler(async (req, res) => {
  const items = req.body; // Expecting an array of items
  const userId = req.user._id;

  // Find the customer's cart
  const customer = await Customer.findById(userId);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  items.forEach(({ productId, attributeId }) => {
    let cartItemIndex;
    // Use a while loop to remove all occurrences of the item
    while (
      (cartItemIndex = customer.cart.findIndex(
        (item) =>
          item.pid.toString() === productId.toString() &&
          item.attributeId.toString() === attributeId.toString()
      )) > -1
    ) {
      // Remove the item from the cart
      customer.cart.splice(cartItemIndex, 1);
    }
  });

  // Save the updated cart
  await customer.save();

  res.status(200).json({
    message: "Cart items removed successfully",
    cart: customer.cart,
  });
});

module.exports = {
  checkOTP,
  deleteCustomer,
  forgotPassword,
  getCustomer,
  getCurrentCustomer,
  loginCustomer,
  logout,
  refreshAccessToken,
  registerCustomer,
  resetPassword,
  updateCustomer,
  updateCustomerBYAdmin,
  getCustomerByCookie,
  addCart,
  getCart,
  updateCart,
  deleteCartItem,
  deleteManyCart,
};
