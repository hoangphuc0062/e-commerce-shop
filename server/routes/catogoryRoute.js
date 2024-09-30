const router = require("express").Router();
const ctrl = require("../controllers/categoryController");
const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getAllCategory);

router.use([verifyAccessToken, isAdmin]);
router.post("/create", ctrl.addCategory);
router.delete("/:_id", ctrl.deleteCategory);
router.put("/:_id", ctrl.updateCategory);

module.exports = router;
