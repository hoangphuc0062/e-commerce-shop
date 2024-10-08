const router = require("express").Router();

const ctrl = require("../controllers/postController");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

//api for client
router.get("/", ctrl.getAllPost);
router.get("/:slug", ctrl.getPostBySlug);
// apis for admin
router.use([verifyAccessToken, isAdmin]);
router.post("/create", ctrl.addPost);
router.get("/id/:bid", ctrl.getPostById);
router.put("/:bid", ctrl.updatePost);
router.delete("/:bid", ctrl.deletePost);
router.delete("/", ctrl.deleteManyPost);
module.exports = router;
