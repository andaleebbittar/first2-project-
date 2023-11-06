const MedicalCondition = require("../models/MedicalCondition.model");
const animals = require("../models/animals.model");
const _ = require("lodash");
const moment = require("moment");
module.exports.add = async (req, res) => {
  try {
    let Medicalid=await MedicalCondition.findOne({
      where:{id:req.body.id},
    })
    if(Medicalid) throw Error(" السجل موجود مسبقا ");
 if (
      !(await animals.findOne({
        where: { id: req.body.animalId },
      }))
    )
      throw Error("رقم الحيوان غير صحيح");

     await MedicalCondition.create({ ...req.body,
    date: moment(req.body.date).format("YYYY-MM-DD"),
     
       });

    res.status(200).send({ success: true, msg: "تمت إضافة بنجاح" });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.delete = async (req, res) => {
   try {
    let updatemedical = await MedicalCondition.findByPk(req.params.id);
    if (!updatemedical) throw Error("السجل غير موجود");

    await updatemedical.destroy({ force: true });
    res.status(200).send({ success: true, msg: "تمت عملية الحذف بنجاح" });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.update = async (req, res) => {
  try {
    let updatemedical = await MedicalCondition.findByPk(req.params.id);
    if (!updatemedical) throw Error("السجل غير موجود");

    if (
      !(await animals.findOne({
        where: { id: req.body.animalId },
      }))
    )
      throw Error("رقم الحيوان غير صحيح");

await MedicalCondition.update(
  {
    ...req.body,
    date: moment(req.body.date).format("YYYY-MM-DD"),
  },
  {
    where: { id: req.params.id },
  }
);
    res.status(200).send({ success: true, msg: "تمت عملية التحديث بنجاح" });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.getAll = async (req, res) => {
  try {
    let data = await MedicalCondition.findAll({
      attributes: { exclude: ["id"] },
    });
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
