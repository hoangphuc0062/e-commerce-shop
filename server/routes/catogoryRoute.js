const router = require("express").Router();
const ctrl = require("../controllers/categoryController");
const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getAllCategory);

router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.addCategory);
router.delete("/:_id", ctrl.deleteCategory);
router.delete("/", ctrl.deleteManyCategories);
router.put("/:_id", ctrl.updateCategory);

module.exports = router;
