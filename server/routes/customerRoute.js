const router = require("express").Router();

const ctrl = require("../controllers/customerController");
const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.post("/register", ctrl.registerCustomer);
router.get("/finalregister/:token", ctrl.finalRegister);

router.post("/login", ctrl.loginCustomer);

router.post("/checkOTP", ctrl.checkOTP);
router.get("/logout", ctrl.logout);
router.post("/forgotpassword", ctrl.forgotPassword);
router.put("/resetpassword", ctrl.resetPassword);
router.post("/refreshtoken", ctrl.refreshAccessToken);
router.post("/add-cart", verifyAccessToken, ctrl.addCart);
router.get("/get-cart", verifyAccessToken, ctrl.getCart);
router.put("/update-cart", verifyAccessToken, ctrl.updateCart);
router.delete("/delete-cart", verifyAccessToken, ctrl.deleteCartItem);
router.delete("/delete-all-cart", verifyAccessToken, ctrl.deleteManyCart);

router.get("/", ctrl.getCustomer);
router.get("/get-cookie", verifyAccessToken, ctrl.getCustomerByCookie);
router.get("/get-current", verifyAccessToken, ctrl.getCurrentCustomer);
router.put("/user/:_id", verifyAccessToken, ctrl.updateCustomer);

router.use([verifyAccessToken, isAdmin]);
router.delete("/:_id", ctrl.deleteCustomer);

router.put("/:_id", ctrl.updateCustomerBYAdmin);

module.exports = router;
