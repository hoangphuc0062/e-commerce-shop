const router = require("express").Router();

const ctrl = require("../controllers/productController");

const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getAllProduct);

router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.addProduct);
router.post("/many", ctrl.addManyProduct);
router.put("/:pid", ctrl.updateProduct);
router.delete("/:pid", ctrl.deleteProduct);
module.exports = router;
