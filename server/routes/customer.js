const router = require("express").Router();

const {
  registerCustomer,
  loginCustomer,
  checkOTP,
  logout,
  forgotPassword,
  resetPassword,
  getCustomer,
  deleteCustomer,
  updateCustomer,
  updateCustomerBYAdmin,
  refreshAccessToken,
} = require("../controllers/customer");
const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/checkOTP", checkOTP);
router.get("/logout", logout);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.post("/refreshtoken", refreshAccessToken);

router.get("/", getCustomer);
router.delete("/:_id", deleteCustomer);
router.put("/:_id", verifyAccessToken, updateCustomer);
router.put("/:_id", updateCustomerBYAdmin);

module.exports = router;
