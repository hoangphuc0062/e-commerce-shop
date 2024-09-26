const router = require("express").Router();

const ctrl = require("../controllers/customer");
const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.post("/register", ctrl.registerCustomer);
router.post("/login", ctrl.loginCustomer);
router.post("/checkOTP", ctrl.checkOTP);
router.get("/logout", ctrl.logout);
router.post("/forgotpassword", ctrl.forgotPassword);
router.put("/resetpassword", ctrl.resetPassword);
router.post("/refreshtoken", ctrl.refreshAccessToken);

router.get("/", ctrl.getCustomer);
router.delete("/:_id", ctrl.deleteCustomer);
router.put("/:_id", verifyAccessToken, ctrl.updateCustomer);
router.put("/:_id", ctrl.updateCustomerBYAdmin);

module.exports = router;
