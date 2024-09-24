const router = require("express").Router();
const { registerStaff, login } = require("../controllers/staff");
const {
  verifyAccessToken,
  isSuperAdmin,
  isAdmin,
} = require("../middlewares/vertifyToken");

router.post("/register", verifyAccessToken, isSuperAdmin, registerStaff);
router.post("/login", login);

module.exports = router;
