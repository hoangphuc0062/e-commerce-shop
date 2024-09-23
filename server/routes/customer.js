const router = require("express").Router();

const { registerCustomer, loginCustomer } = require("../controllers/customer");
const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

module.exports = router;
