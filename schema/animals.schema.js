const Joi = require("joi");
module.exports.schema = {
  body: Joi.object({
    id: Joi.number().allow(null),
    motherid: Joi.number().allow(null),
    fatherid: Joi.number().allow(null),
   birthday: Joi.date().max(new Date()).required(),
status: Joi.string().valid("جفاف", "صغير", "حلوب", "غير حلوب", "حامل").when("gender", {
  is: "عجل",
  then: Joi.allow("null"),
  otherwise: Joi.required(),
}),
    gender: Joi.string().valid("عجل", "بقرة").required(),
    weight: Joi.number().required(),
  }),
  params: Joi.object({ id: Joi.number().required() }),
  query: {},
};
