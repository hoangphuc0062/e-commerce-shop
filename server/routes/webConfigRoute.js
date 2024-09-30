const router = require("express").Router();

const ctrl = require("../controllers/webConfigController");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getWebConfig);
router.post("/create", ctrl.createWebConfig);
router.put("/:wid", ctrl.updateWebConfig);
router.delete("/:wid", ctrl.deleteWebConfig);

module.exports = router;
