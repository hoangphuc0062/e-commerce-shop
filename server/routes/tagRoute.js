const router = require("express").Router();

const ctrl = require("../controllers/tagController");

router.post("/create", ctrl.createTag);
router.get("/", ctrl.getTags);
router.put("/:_id", ctrl.updateTag);
router.delete("/:_id", ctrl.deleteTag);

module.exports = router;
