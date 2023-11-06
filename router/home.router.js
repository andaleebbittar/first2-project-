const express = require("express");
const router = new express.Router();
const control = require("../controllers/home.controller");
const { type } = require("../validation/typeValidation"); 
const { validate } = require("../validation/validation");
const authMiddleware = require("../middleware/auth");
 
router.get("/getCount",authMiddleware,control.getGender)

module.exports = router;
