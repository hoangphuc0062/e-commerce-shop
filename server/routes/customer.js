const router = require("express").Router();

const {
  registerCustomer,
  loginCustomer,
  checkOTP,
} = require("../controllers/customer");
const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/checkOTP", checkOTP);

module.exports = router;
