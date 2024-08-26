const router = require("express").Router();

const ctrl = require("../controllers/category");

router.get("/", ctrl.getAllCategory);
const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");
router.get("/list", ctrl.getAllCategory);

// router.use([verifyAccessToken, isAdmin]);
router.post("/create", ctrl.addCategory);
router.delete("/:_id", ctrl.deleteCategory);
router.put("/:_id", ctrl.updateCategory);

module.exports = router;
