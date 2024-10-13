const router = require("express").Router();

const ctrl = require("../controllers/iconController");

const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getAllIcons);

router.use([verifyAccessToken, isStaff]);

router.post("/", ctrl.addIconClass);
router.post("/many", ctrl.addManyIconClass);

router.put("/:iconId", ctrl.updateIconClass);
router.delete("/:iconId", ctrl.deleteIconClass);
router.delete("/", ctrl.deleteManyIconClass);

module.exports = router;
