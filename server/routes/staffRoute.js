const router = require("express").Router();
const ctrl = require("../controllers/staffController");
const {
  verifyAccessToken,
  isSuperAdmin,
  isAdmin,
} = require("../middlewares/vertifyToken");

router.get("/get-current", verifyAccessToken, ctrl.getStaffCurrent);

router.post("/register", verifyAccessToken, isSuperAdmin, ctrl.registerStaff);
router.post("/login", ctrl.login);
router.post("/logout", ctrl.logout);
router.post("/refreshtoken", ctrl.refreshAccessToken);
router.post("/forgotpassword", ctrl.forgotPassword);
router.post("/resetpassword", ctrl.resetPassword);

router.use(verifyAccessToken, isAdmin);
router.get("/", ctrl.getStaff);
router.get("/:sid", ctrl.getStaffById);
router.put("/:sid", ctrl.updateStaff);
router.delete("/:sid", ctrl.deleteStaff);

module.exports = router;
