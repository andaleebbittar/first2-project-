const Joi = require("joi");

module.exports.schema = {
  body: Joi.object({
    name: Joi.string().required().trim(),
    data:Joi.object().required(),
  }),
  params: Joi.object({ id: Joi.number().required() }),
  query: {},
};
