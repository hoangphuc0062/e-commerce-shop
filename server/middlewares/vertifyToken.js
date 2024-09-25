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
          mes: "Invalid access token",
        });
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      mes: "Require authencation !",
    });
  }
});
const checkRole = (requiredRole, roleName) => {
  return asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    console.log(role);
    if (+role !== requiredRole) {
      return res.status(401).json({
        success: false,
        mes: `Require ${roleName} role!`,
      });
    }
    next();
  });
};
// Quản lý các quyền cụ thể
const isSuperAdmin = checkRole(0, "superadmin"); // Super Admin chỉ có quyền khi role >= 2
const isAdmin = checkRole(1, "admin"); // Admin chỉ có quyền khi role >= 0
const isEditor = checkRole(2, "editor"); // Editor chỉ có quyền khi role >= 1
const isSales = checkRole(3, "sales"); // Sales chỉ có quyền khi role >= 3
const isCustomer = checkRole(4, "customer"); // Customer chỉ có quyền khi role >= 4

module.exports = {
  verifyAccessToken,
  isAdmin,
  isEditor,
  isSales,
  isCustomer,
  isSuperAdmin,
};
