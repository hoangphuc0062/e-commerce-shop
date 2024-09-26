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

router.use([verifyAccessToken, isAdmin]);
router.get("/", ctrl.getStaff);
router.get("/:sid", ctrl.getStaffById);
router.put("/:sid", ctrl.updateStaff);
router.delete("/:sid", ctrl.deleteStaff);

module.exports = router;
