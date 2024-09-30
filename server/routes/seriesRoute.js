const router = require("express").Router();

const ctrl = require("../controllers/seriesController");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

//api for client
router.get("/", ctrl.getAllCollection);
// apis for admin
router.use([verifyAccessToken, isAdmin]);
router.post("/create", ctrl.addSery);
router.put("/:sid", ctrl.updateSery);
router.delete("/:sid", ctrl.deleteSery);

module.exports = router;
