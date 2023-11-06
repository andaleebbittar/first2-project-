const Joi = require("joi");
module.exports.schema = {
  body: Joi.object({
    animalId: Joi.number().required(),
    inseminationDate: Joi.date().required(),
    inseminatedBullid: Joi.number().required(),
    inseminationType: Joi.string().required(),
     
    dateBirth:Joi.date().max(new Date()),
  }),
  params: Joi.object({ id: Joi.number().required() }),
  query: {},
};
