const router = require("express").Router();
const ctrl = require("../controllers/settingFilterController");
const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

router.get("/filter/", ctrl.getAllSettingFilter);
router.post("/filter/get-category", ctrl.getCategoryNameInCategoryFilter);

router.use([verifyAccessToken, isStaff]);
router.post("/filter/", ctrl.createSettingFilter);
router.put("/filter/:_id", ctrl.updateSettingFilter);
router.delete("/filter/:_id", ctrl.deleteSettingFilter);
router.delete("/filter/:_id/:filterButtonId", ctrl.deleteSettingFilterOne);
router.put("/filter/update/:_id/:filterButtonId", ctrl.updateSettingFilterOne);
router.get("/filter/:_id", ctrl.getAllSettingFilterById);

module.exports = router;
