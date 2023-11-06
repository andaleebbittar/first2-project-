const protectvaccines = require("../models/protectvaccines.model");
const _ = require("lodash");
const moment = require("moment");
module.exports.add = async (req, res) => {
  try {
    let ans = await protectvaccines.findOne({
      where:
       {
         name: req.body.name.trim(), 
         date: moment(req.body.date).format("YYYY-MM-DD"),
       },
    });
    if (ans) throw Error("لايجب أخذ نفس اللقاح مرتين باليوم ");

    await protectvaccines.create({
      name: req.body.name.trim(),
     date: moment(req.body.date).format("YYYY-MM-DD"),
    });
    res.status(200).send({ success: true, msg: "تمت اضافة بنجاح " });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.delete = async (req, res) => {
  try {
    let vaccineDelete = await protectvaccines.findByPk(req.params.id);
    if (!vaccineDelete) throw Error("اللقاح غير موجود");
    await vaccineDelete.destroy({ force: true });
    res.status(200).send({ success: true, msg: "تمت عملية الحذف بنجاح" });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.update = async (req, res) => {
  try {
    let updatevavvines = await protectvaccines.findByPk(req.params.id);
    if (!updatevavvines) throw Error("القاح غير موجود");

    updatevavvines.name = req.body.name.trim();
    updatevavvines.date = moment(req.body.date).format("YYYY-MM-DD"),
    await updatevavvines.save();

    res.status(200).send({ success: true, msg: "تمت عملية التحديث بنجاح" });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.getAll = async (req, res) => {
  try {
    let data = await protectvaccines.findAll({
      attributes: { exclude: ["id"] },
    });
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
