const router = require("express").Router();
const ctrl = require("../controllers/staff");
const {
  verifyAccessToken,
  isSuperAdmin,
  isAdmin,
} = require("../middlewares/vertifyToken");

router.post("/register", verifyAccessToken, isSuperAdmin, ctrl.registerStaff);
router.post("/login", ctrl.login);
router.post("/logout", ctrl.logout);

module.exports = router;
