const router = require("express").Router();

const ctrl = require("../controllers/storeController");

router.post("/create", ctrl.createStore);
router.get("/", ctrl.getStores);
router.put("/:_id", ctrl.updateStore);
router.delete("/:_id", ctrl.deleteStore);

module.exports = router;
