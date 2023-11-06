const express = require("express");
const router = new express.Router();
const control = require("../controllers/MedicalCondition.controller");
const { type } = require("../validation/typeValidation");
const { schema } = require("../schema/MedicalCondition.schema");
const { validate } = require("../validation/validation");
const authMiddleware = require("../middleware/auth");
router.post("/add", authMiddleware, validate(schema.body, type.body), control.add);

router.put(
  "/update/:id",
  authMiddleware,

  validate(schema.body, type.body),
  validate(schema.params, type.params),
  control.update
);

router.delete(
  "/delete/:id",
  authMiddleware,

  validate(schema.params, schema.params),
  control.delete
);

router.get("/all", authMiddleware, control.getAll);
module.exports = router;
