const router = require("express").Router();

const ctrl = require("../controllers/brandController");

const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

//api for client
router.get("/", ctrl.getAllBrand);
// apis for admin

router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.addBrand);
router.put("/:bid", ctrl.updateBrand);
router.delete("/:bid", ctrl.deleteBrand);
router.delete("/", ctrl.deleteManyBrand);

module.exports = router;
