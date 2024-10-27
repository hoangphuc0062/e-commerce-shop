const router = require("express").Router();

const ctrl = require("../controllers/paymentConfigController");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.get("/", verifyAccessToken, isAdmin, ctrl.getAllPaymentConfig);
router.post("/", verifyAccessToken, isAdmin, ctrl.createPaymentConfig);
router.put(
  "/:paymentConfigId",
  verifyAccessToken,
  isAdmin,
  ctrl.updatePaymentConfig
);
router.delete(
  "/:paymentConfigId",
  verifyAccessToken,
  isAdmin,
  ctrl.deletePaymentConfig
);

module.exports = router;
