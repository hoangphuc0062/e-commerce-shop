const router = require("express").Router();

const ctrl = require("../controllers/wareHouseController.js");
const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");
router.get("/", ctrl.getWareHouses);
router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.createWareHouse);
router.put("/:wid", ctrl.updateWareHouse);
router.delete("/:wid", ctrl.deleteWareHouse);

module.exports = router;
