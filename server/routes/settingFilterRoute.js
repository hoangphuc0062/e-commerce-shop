const router = require("express").Router();
const ctrl = require("../controllers/settingFilterController");

router.get("/filter/", ctrl.getAllCategoryFilter);

module.exports = router;
