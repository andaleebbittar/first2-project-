const Joi = require("joi");

module.exports.schema = {
  body: Joi.object({
    message: Joi.string().required().trim(),
    type: Joi.string().required().trim(),
    userid:Joi.number().required()
  }),
  params: Joi.object({ id: Joi.number().required() }),
  query: {},
};
