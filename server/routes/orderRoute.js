const router = require("express").Router();

const ctrl = require("../controllers/orderController");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.post("/", verifyAccessToken, ctrl.createOrder);

router.get("/", verifyAccessToken, isAdmin, ctrl.getAllOrder);
router.put("/status/:oid", verifyAccessToken, isAdmin, ctrl.updateStatus);
router.get("/user", verifyAccessToken, ctrl.getOrderByUser);
// router.use([verifyAccessToken, isAdmin]);

router.post("/create-payment-url", ctrl.create_payment_url);
router.get("/vnpay-return", ctrl.vnpay_return);
router.post("/send-mail", verifyAccessToken, ctrl.sendSuccessEmail);

module.exports = router;
