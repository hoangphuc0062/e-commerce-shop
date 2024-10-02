const router = require("express").Router();

const ctrl = require("../controllers/bannerCollectionController");

router.get("/", ctrl.getAllBannerCollection);
router.post("/create", ctrl.createBannerCollection);
router.put("/:bid", ctrl.updateBannerCollection);
router.delete("/:bid", ctrl.deleteBannerCollection);

module.exports = router;
