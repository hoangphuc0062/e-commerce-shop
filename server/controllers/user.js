const User = require("../models/user");

const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const sendMail = require("../ultils/sendMail");
const crypto = require("crypto");
const makeToken = require("uniquid");

// const register = asyncHandler(async (req, res) => {
//   const { email, password, firstname, lastname } = req.body;
//   if (!email || !password || !firstname || !lastname) {
//     return res.status(400).json({
//       success: false,
//       mes: "Missing inputs",
//     });
//   }
//   const user = await User.findOne({ email: email });
//   if (user) throw new Error("User has already existed");
//   else {
//     const newUser = await User.create(req.body);
//     return res.status(200).json({
//       success: newUser ? true : false,
//       mes: newUser
//         ? "Register is succesful. Please login"
//         : "Some thing went wrong",
//     });
//   }
// });

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, mobile } = req.body;
  if (!email || !password || !firstname || !lastname || !mobile) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }

  const user = await User.findOne({ email: email });
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
      <a href=${process.env.URL_SERVER}/api/users/finalregister/${token}>Click here</a>`;
    const subject = `Hoàn tất đăng ký Hoàng Phúc Store Account`;

    const rs = await sendMail(email, html, subject);

    return res.status(200).json({
      success: true,
      mes: "Please check your email to active account",
      rs,
    });
  }
});

const finalRegister = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const { token } = req.params;

  if (!cookie || !cookie.dataregister || cookie.dataregister.token !== token) {
    res.clearCookie("dataregister");
    return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
  }

  const newUser = await User.create({
    email: cookie.dataregister.email,
    password: cookie.dataregister.password,
    firstname: cookie.dataregister.firstname,
    lastname: cookie.dataregister.lastname,
    mobile: cookie.dataregister.mobile,
  });
  res.clearCookie("dataregister");
  if (newUser) {
    return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`);
  } else {
    return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
  }
});

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
  const response = await User.findOne({ email: email });
  //plain object
  if (response && (await response.isCorrectPassword(password))) {
    // tach pw và role ra khỏi response
    const { password, role, refreshToken, ...userData } = response.toObject();
    // tạo accessToken
    const accessToken = generateAccessToken(response._id, role);
    // tạo refreshToken
    const newRefreshToken = generateRefreshToken(response._id);
    // Lưu refresh token vào database
    await User.findByIdAndUpdate(
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
const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select(
    "-refreshToken -password -role "
  );
  return res.status(200).json({
    success: user ? true : false,
    rs: user ? user : "User not Found",
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
  const response = await User.findOne({
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
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  // ktr có cookie tồn tại chưa
  if (!cookie || !cookie.refreshToken)
    throw new Error("No Refresh Token in cookies");
  // xóa refresh token ở db
  await User.findOneAndUpdate(
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

// Client gửi email
// Server check mail có hợp lệ hay k => hợp lệ gửi mail + kèm theo link (password change token)
// Client Check mail click vào link đã gửi
// Client gửi API kèm theo token
// Check token có giống với token mà serve gửi hay k
// Change Password

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangeToken();
  await user.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
  <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`;
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
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExprires: { $gt: Date.now() },
  });
  // lưu vào db
  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExprires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? " Update password" : "Something went wrong",
  });
});
const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select("-refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    users: response,
  });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id) throw new Error("Missing inputs");
  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deletedUser: response
      ? `User with email ${response.email} deleted `
      : `No user delete`,
  });
});
// update trong minh nó
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    UpdatedUser: response ? response : `Some thing went wrong`,
  });
});
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    UpdatedUser: response ? response : `Some thing went wrong`,
  });
});

const addUserByAdmin = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, mobile } = req.body;
  if (!email || !password || !firstname || !lastname || !mobile) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }
  const user = await User.findOne({ email: email });
  if (user) throw new Error("User has already existed");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser
        ? "Add a new user success. Please login"
        : "Some thing went wrong",
    });
  }
});

const updateAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  if (!req.body.address) throw new Error(`Missing input`);

  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { address: req.body.address } },
    { new: true }
  ).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : `Some thing went wrong`,
  });
});
const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity, size, color } = req.body;

  if (!pid || !quantity || !size || !color) {
    return res.status(400).json({
      success: false,
      message: "Missing input",
    });
  }

  const user = await User.findById(_id).select("cart");
  const productDetails = await Product.findById(pid).select(
    "name images price"
  );

  if (!productDetails) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const { name, images, price } = productDetails;
  const image = images[0]; // Assuming you want to store only the first image

  const alreadyProduct = user?.cart?.find(
    (el) => el.pid && el.pid.toString() === pid
  );

  if (alreadyProduct) {
    let newQuantity = Number(quantity) + alreadyProduct.quantity;

    const response = await User.updateOne(
      { _id, "cart.pid": pid },
      {
        $set: {
          "cart.$.quantity": newQuantity,
          "cart.$.name": name, // Update the product name
          "cart.$.image": image, // Update the product image
          "cart.$.price": price, // Update the price
        },
      },
      { new: true }
    );

    return response
      ? res.status(200).json({
          success: true,
          updatedUser: response,
        })
      : res.status(400).json({
          success: false,
          message: "Can't update quantity",
        });
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      {
        $push: {
          cart: {
            pid: pid,
            quantity,
            color,
            size,
            name, // Include the product name
            image, // Include the product image
            price, // Include the price
          },
        },
      },
      { new: true }
    );

    return response
      ? res.status(200).json({
          success: true,
          updatedUser: response,
        })
      : res.status(400).json({
          success: false,
          message: "Something went wrong",
        });
  }
});
const updateQuantityInCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  var { pid, quantity } = req.body;

  if (!pid || !quantity || pid.length !== quantity.length) {
    return res.status(400).json({
      success: false,
      message:
        "Missing product IDs or quantities, or their lengths do not match",
    });
  }

  // Convert quantities to numbers
  quantity = quantity.map(Number);

  // Find user and check if products are in the cart
  const user = await User.findById(_id).select("cart");

  if (user) {
    // Update quantity for each product
    for (let i = 0; i < pid.length; i++) {
      await User.updateOne(
        { _id, "cart.pid": pid[i] },
        {
          $set: {
            "cart.$.quantity": quantity[i],
          },
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Quantities updated successfully",
    });
  } else {
    // Products not found in the cart
    return res.status(404).json({
      success: false,
      message: "Products not found in cart",
    });
  }
});

const removeItemInCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid } = req.body;

  if (!pid) {
    return res.status(400).json({
      success: false,
      message: "Missing input",
    });
  }

  const response = await User.findByIdAndUpdate(
    _id,
    {
      $pull: {
        cart: { pid: pid },
      },
    },
    { new: true }
  );

  return response
    ? res.status(200).json({
        success: true,
        updatedUser: response,
      })
    : res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
});
module.exports = {
  register,
  finalRegister,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  addUserByAdmin,
  updateAddress,
  updateCart,
  updateQuantityInCart,
  removeItemInCart,
};
