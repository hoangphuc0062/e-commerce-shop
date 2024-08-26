const router = require("express").Router();

const ctrl = require("../controllers/product");

const uploader = require("../config/cloudinary.config");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.get("/:pid", ctrl.getProduct);
// router.use([verifyAccessToken, isAdmin]);
router.get("/", ctrl.getAllProduct);
router.post("/create", ctrl.addProduct);

router.delete("/:pid", ctrl.deleteProductByAdmin);
router.put("/:pid", ctrl.updateProduct);
router.post(
  "/createwithfile",
  uploader.array("images", 10),
  ctrl.uploadImagesProduct
);

module.exports = router;
