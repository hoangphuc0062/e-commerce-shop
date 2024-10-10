const router = require("express").Router();

const ctrl = require("../controllers/seriesController");

const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

//api for client
router.get("/", ctrl.getAllSeries);
// apis for admin
router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.addSeries);
router.put("/:sid", ctrl.updateSeries);
router.delete("/:sid", ctrl.deleteSeries);
router.delete("/", ctrl.deleteManySeries);

module.exports = router;
