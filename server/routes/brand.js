const router = require("express").Router();

const ctrl = require("../controllers/brand");

//apis for client

// api for admin
const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");
