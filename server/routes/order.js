const router = require("express").Router();

const ctrl = require("../controllers/order");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.post("/", verifyAccessToken, ctrl.createOrder);

router.get("/", verifyAccessToken, isAdmin, ctrl.getAllOrder);
router.put("/status/:oid", verifyAccessToken, isAdmin, ctrl.updateStatus);
// router.use([verifyAccessToken, isAdmin]);

module.exports = router;
