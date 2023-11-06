const express = require("express");
const router = express.Router();
const{ login, logout, signup } = require("../controllers/auth");
const auth  = require("../middleware/auth");

router.post("/login", login);
router.post("/logout", auth,logout);
router.post("/signup",signup);
module.exports = router;