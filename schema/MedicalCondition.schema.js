const Joi = require("joi");
module.exports.schema = {
  body: Joi.object({
     id: Joi.number().allow(null),
     animalId: Joi.number().required(),
    disease: Joi.string().required().trim(),
    traetment: Joi.string().required().trim(),
    date:Joi.date().max(new Date()).required(),
  }),
  params: Joi.object({ id: Joi.number().required() }),
  query: {},
};
