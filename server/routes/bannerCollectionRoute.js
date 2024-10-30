const router = require("express").Router();

const ctrl = require("../controllers/bannerCollectionController");

const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getAllBannerCollection);
router.get("/:bid", ctrl.getBannerCollectionById);
router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.createBannerCollection);
router.put("/:bid", ctrl.updateBannerCollection);
router.delete("/:bid", ctrl.deleteBannerCollection);

module.exports = router;
