const router = require("express").Router();
const ctrl = require("../controllers/settingFilterController");
const {
  verifyAccessToken,
  isAdmin,
  isStaff,
  isSuperAdmin,
} = require("../middlewares/vertifyToken");

router.get("/filter/", ctrl.getAllSettingFilter);

router.use([verifyAccessToken, isStaff]);
router.post("/filter/", ctrl.createSettingFilter);
router.put("/filter/:_id", ctrl.updateSettingFilter);
router.delete("/filter/:_id", ctrl.deleteSettingFilter);

module.exports = router;
