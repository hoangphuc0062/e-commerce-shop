const router = require("express").Router();
const ctrl = require("../controllers/settingFilterController");
const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

router.get("/filter/", ctrl.getAllSettingFilter);
router.get("/filter/get-category", ctrl.getCategoryNameInCategoryFilter);

router.use([verifyAccessToken, isStaff]);
router.post("/filter/", ctrl.createSettingFilter);
router.put("/filter/:_id", ctrl.updateSettingFilter);
router.delete("/filter/:_id", ctrl.deleteSettingFilter);

module.exports = router;
