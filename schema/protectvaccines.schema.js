const Joi = require("joi");
module.exports.schema = {
  body: Joi.object({
    name: Joi.string().required().trim(),
    date: Joi.date().max(new Date()).required(),
  }),
  params: Joi.object({ id: Joi.number().required() }),
  query: {},
};
