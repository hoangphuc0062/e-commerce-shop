const router = require("express").Router();

const ctrl = require("../controllers/globalSeoController");
const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getGlobalSeo);
router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.createGlobalSeo);
router.put("/:gbs", ctrl.updateGlobalSeo);
router.delete("/:gbs", ctrl.deleteGlobalSeo);

module.exports = router;
