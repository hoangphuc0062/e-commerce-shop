const router = require("express").Router();

const ctrl = require("../controllers/coupon");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getCoupon);
router.use([verifyAccessToken, isAdmin]);
router.post("/", ctrl.createNewCoupon);
router.put("/:cid", ctrl.updateCoupon);
router.delete("/:cid", ctrl.deleteCoupon);

module.exports = router;
