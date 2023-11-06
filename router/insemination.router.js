const express = require("express");
const router = new express.Router();
const control = require("../controllers/insemination.controller");
const { type } = require("../validation/typeValidation");
const { schema } = require("../schema/insemination.schema");
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
router.post("/sure", authMiddleware, validate(schema.body, type.body), control.sure);
router.post("/birthprocess", authMiddleware,
 validate(schema.query, ["animalId", "inseminatedBullid"]),
 validate(schema.body, ["dateBirth"]), control.birthprocess);
module.exports = router;
