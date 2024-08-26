const router = require("express").Router();

const ctrl = require("../controllers/user");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.post("/register", ctrl.register);
router.get("/finalregister/:token", ctrl.finalRegister);
router.post("/login", ctrl.login);
router.get("/current", verifyAccessToken, ctrl.getCurrent);
router.put("/updateaddress/:uid", verifyAccessToken, ctrl.updateAddress);

router.put("/cart", verifyAccessToken, ctrl.updateCart);
router.put("/cartquanity", verifyAccessToken, ctrl.updateQuantityInCart);
router.delete("/remove", verifyAccessToken, ctrl.removeItemInCart);
router.post("/refreshtoken", ctrl.refreshAccessToken);
router.get("/logout", ctrl.logout);
router.post("/forgotpassword", ctrl.forgotPassword);
router.put("/resetpassword", ctrl.resetPassword);
// Trong ngoặc vuông để phân biệt middleware

router.get("/", ctrl.getUsers);
router.post("/create", ctrl.addUserByAdmin);
router.delete("/:_id", ctrl.deleteUser);
router.put("/current", verifyAccessToken, ctrl.updateUser);
router.put("/:_id", ctrl.updateUserByAdmin);

module.exports = router;

// CRUD | Create - read - update - delete | POST - GET - PUT - DELETE
// Create (POST) + PUT - body không lộ
// Get + Delete - query // bị lộ thông tin
