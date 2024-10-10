const router = require("express").Router();

const ctrl = require("../controllers/shippingUnitController");
const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getShippingUnits);

router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.createShippingUnit);
router.put("/:sid", ctrl.updateShippingUnit);
router.delete("/:sid", ctrl.deleteShippingUnit);

module.exports = router;
