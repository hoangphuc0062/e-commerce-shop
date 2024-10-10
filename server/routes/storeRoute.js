const router = require("express").Router();

const ctrl = require("../controllers/storeController");
const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");
router.get("/", ctrl.getStores);

router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.createStore);
router.put("/:_id", ctrl.updateStore);
router.delete("/:_id", ctrl.deleteStore);

module.exports = router;
