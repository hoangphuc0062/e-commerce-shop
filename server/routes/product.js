const router = require("express").Router();

const ctrl = require("../controllers/product");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.get("/:pid", ctrl.getProduct);
router.get("/", ctrl.getAllProduct);

router.use([verifyAccessToken, isAdmin]);

module.exports = router;
