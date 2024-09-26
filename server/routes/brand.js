const router = require("express").Router();

const ctrl = require("../controllers/brand");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

//api for client
router.get("/", ctrl.getAllBrand);
// apis for admin

router.use([verifyAccessToken, isAdmin]);
router.post("/create", ctrl.addBrand);
router.put("/:bid", ctrl.updateBrand);
router.delete("/:bid", ctrl.deleteBrand);

module.exports = router;
