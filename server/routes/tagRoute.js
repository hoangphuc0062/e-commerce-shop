const router = require("express").Router();

const ctrl = require("../controllers/tagController");
const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

router.get("/", ctrl.getTags);

router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.createTag);
router.put("/:_id", ctrl.updateTag);
router.delete("/:_id", ctrl.deleteTag);

module.exports = router;
