const router = require("express").Router();

const ctrl = require("../controllers/productController");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getAllProduct);
router.get("/:pid", ctrl.getProductById);
router.get("/:slug", ctrl.getProductBySlug);
router.use([verifyAccessToken, isAdmin]);
router.post("/create", ctrl.addProduct);
router.put("/:pid", ctrl.updateProduct);
router.delete("/:pid", ctrl.deleteProduct);

module.exports = router;
