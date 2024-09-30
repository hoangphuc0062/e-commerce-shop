const router = require("express").Router();
const ctrl = require("../controllers/staff");
const {
  verifyAccessToken,
  isSuperAdmin,
  isAdmin,
} = require("../middlewares/vertifyToken");
const crypto = require("crypto");
const makeToken = require("uniquid");
const jwt = require("jsonwebtoken");

router.post("/register", verifyAccessToken, isSuperAdmin, ctrl.registerStaff);
router.post("/login", ctrl.login);
router.post("/logout", ctrl.logout);
router.post("/refreshtoken", ctrl.refreshAccessToken);
router.post("/forgotpassword", ctrl.forgotPassword);
router.post("/resetpassword", ctrl.resetPassword);

router.get("/", verifyAccessToken, isAdmin, ctrl.getStaff);
router.get("/:sid", verifyAccessToken, isAdmin, ctrl.getStaffById);
router.put("/:sid", verifyAccessToken, isAdmin, ctrl.updateStaff);
router.delete("/:sid", verifyAccessToken, isAdmin, ctrl.deleteStaff);

module.exports = router;
