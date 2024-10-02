const router = require("express").Router();

const ctrl = require("../controllers/shippingUnitController");

router.get("/", ctrl.getShippingUnits);
router.post("/create", ctrl.createShippingUnit);
router.put("/:sid", ctrl.updateShippingUnit);
router.delete("/:sid", ctrl.deleteShippingUnit);

module.exports = router;
