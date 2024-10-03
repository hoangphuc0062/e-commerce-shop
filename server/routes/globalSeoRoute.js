const router = require("express").Router();

const ctrl = require("../controllers/globalSeoController");

router.get("/", ctrl.getGlobalSeo);
router.post("/create", ctrl.createGlobalSeo);
router.put("/:gbs", ctrl.updateGlobalSeo);
router.delete("/:gbs", ctrl.deleteGlobalSeo);

module.exports = router;
