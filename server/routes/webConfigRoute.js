const router = require("express").Router();

const ctrl = require("../controllers/webConfigController");

const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getWebConfig);
router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.createWebConfig);
router.put("/:wid", ctrl.updateWebConfig);
router.delete("/:wid", ctrl.deleteWebConfig);

module.exports = router;
