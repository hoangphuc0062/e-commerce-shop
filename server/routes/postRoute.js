const router = require("express").Router();

const ctrl = require("../controllers/postController");

const { verifyAccessToken, isStaff } = require("../middlewares/vertifyToken");

//api for client
router.get("/", ctrl.getAllPost);
router.get("/:slug", ctrl.getPostBySlug);
router.put("/ratings", verifyAccessToken, ctrl.ratingPosts);
router.delete("/delete-ratings/:rid", verifyAccessToken, ctrl.deleteRating);
// apis for admin
router.use([verifyAccessToken, isStaff]);
router.post("/create", ctrl.addPost);
router.get("/id/:bid", ctrl.getPostById);
router.put("/:bid", ctrl.updatePost);
router.delete("/:bid", ctrl.deletePost);
router.delete("/", ctrl.deleteManyPost);
// router.get("/id/:bid", ctrl.getPostById);
module.exports = router;
