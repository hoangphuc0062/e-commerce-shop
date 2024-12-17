const router = require("express").Router();

const ctrl = require("../controllers/orderController");

const {
  verifyAccessToken,
  isAdmin,
  isStaff,
} = require("../middlewares/vertifyToken");

router.post("/", verifyAccessToken, ctrl.createOrder);
router.get("/", verifyAccessToken, isStaff, ctrl.getAllOrder);
router.put("/:_id", verifyAccessToken, isStaff, ctrl.updateOrder);
router.delete("/:_id", verifyAccessToken, isStaff, ctrl.deleteOrder);
router.post(
  "/create-in-store-order",
  verifyAccessToken,
  isStaff,
  ctrl.createInStoreOrder
);

router.get("/code/:sku", ctrl.getOrderBySKU);

router.get("/user", verifyAccessToken, ctrl.getOrderByUser);
// router.use([verifyAccessToken, isAdmin]);

router.post("/create-payment-url", ctrl.create_payment_url);
router.post(
  "/create-payment-url-By-Order-Staff",
  ctrl.create_payment_url_By_Order_Staff
);
router.get("/vnpay-return", ctrl.vnpay_return);
router.post("/send-mail", verifyAccessToken, ctrl.sendSuccessEmail);

router.use([verifyAccessToken, isAdmin]);
router.get("/get-analytics", verifyAccessToken, ctrl.analystOrder);

module.exports = router;
