const Joi = require("joi");
module.exports.schema = {
  body: Joi.object({
    period:Joi.string().valid("مساءا", "صباحا").required(),
    amountmillk: Joi.number().required(),
    amountfood: Joi.number().required(),
   date: Joi.date().max(new Date()).required(),
    animalId: Joi.number().required(),
  }),
  params: Joi.object({ id: Joi.number().required() }),
  query: {},
};
