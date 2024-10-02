const router = require("express").Router();

const ctrl = require("../controllers/wareHouseController.js");

router.get("/", ctrl.getWareHouses);
router.post("/create", ctrl.createWareHouse);
router.put("/:wid", ctrl.updateWareHouse);
router.delete("/:wid", ctrl.deleteWareHouse);

module.exports = router;
