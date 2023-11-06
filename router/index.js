const express = require("express");
const router = new express.Router();


router.use("/user", require("./user.router"));
router.use("/home",require("./home.router"))
router.use("/auth", require("./auth.router"));
router.use("/role", require("./role.router"));
router.use("/animals", require("./animals.router"));
router.use("/protectvaccines", require("./protectvaccines.router"));
router.use("/productivity", require("./productivity.router"));
router.use("/MedicalCondition", require("./MedicalCondition.router"));
router.use("/insemination", require("./insemination.router"));
module.exports = router;
