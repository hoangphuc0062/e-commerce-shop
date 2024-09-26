const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  // Bearer + chuoi token
  // headers: {authorization: Bearer token }
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err)
        return res.status(401).json({
          success: false,
          mes: "Token không hợp lệ",
        });
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      mes: "Token không hợp lệ",
    });
  }
});

const checkRole = (requiredRole, roleName) => {
  return asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (+role === 0) {
      return next();
    }
    if (+role === requiredRole) {
      return res.status(401).json({
        mes: `Yêu cầu ${roleName} vai trò!`,
      });
    }
    next();
  });
};
// Quản lý các quyền cụ thể
const isSuperAdmin = checkRole(0, "superadmin");
const isAdmin = checkRole(1, "admin");
const isEditor = checkRole(2, "editor");
const isSales = checkRole(3, "sales");
const isCustomer = checkRole(4, "customer");

module.exports = {
  verifyAccessToken,
  isAdmin,
  isEditor,
  isSales,
  isCustomer,
  isSuperAdmin,
};
