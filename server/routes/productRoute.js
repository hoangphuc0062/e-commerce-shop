const router = require("express").Router();

const ctrl = require("../controllers/productController");

const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getAllProduct);
// router.get("/:pid", ctrl.getProductById);
router.get("/slug/:slug", ctrl.getProductBySlug);
// router.get("/filtered", ctrl.getFilteredProducts);
router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.addProduct);
router.put("/:pid", ctrl.updateProduct);
router.delete("/:pid", ctrl.deleteProduct);
module.exports = router;
