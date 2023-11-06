const Joi = require("joi");

module.exports.schema = {
  body: Joi.object({
    name: Joi.string().required().trim(),
    username: Joi.string().required().trim(),
    password: Joi.string().required(),
    roleId:Joi.number().required()
  }),
  params: Joi.object({ id: Joi.number().required() }),
  query: {},
};
