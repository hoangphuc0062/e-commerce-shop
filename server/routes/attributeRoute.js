const router = require("express").Router();

const ctrl = require("../controllers/attributesController");

const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getAllAttribute);
router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.addAttribute);
router.delete("/:aid", ctrl.deleteAttribute);
router.delete("/", ctrl.deleteManyAttribute);
router.put("/:aid", ctrl.updateAttribute);

module.exports = router;
