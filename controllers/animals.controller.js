const animals = require("../models/animals.model");
const _ = require("lodash");
const moment = require("moment");
module.exports.add = async (req, res) => {
  try {
    if (!req.body.id)
      throw Error(
        "رقم الحيوان غير موجود الرجاء ادخال رقم الحيوان قبل عملية التسجيل "
      );
    let animal = await animals.findByPk(req.body.id, {
      attributes: ["id"],
    });
if (
       req.body.motherid === req.body.fatherid ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "رقم الأم ورقم الأب يجب أن يكونا مختلفين",
     });
   }
if(req.body.gender==="عجل" && req.body.status!== "null"){
  throw Error("ادخال خاطئ لا يمكن ان يتم دخال نوع الحيوان ذكر وله حالة");
}

    const ageInMonths = moment().diff(moment(req.body.birthday, "D/M/YYYY"), "months");
if (req.body.gender === "بقرة"){
    if (ageInMonths < 8 && req.body.status !== "صغير") {
      throw Error("الحالة يجب أن تكون صغير للبقرة التي تقل عمرها عن 8 أشهر");
    }}
if (req.body.gender === "بقرة"){
    if (
      ageInMonths >= 8 &&
     req.body.status==="صغير"
    ) {
      throw Error(
        "الحالة يجب أن تكون حلوب أو غير حلوب أو جفاف او حامل للبقرة التي تزيد عمرها عن 8 أشهر"
      );
    }}
    await animals.create({ ...req.body,});
    res.status(200).send({ success: true, msg: "تمت الاضافة بنجاح" });
  } catch (error) {
    res.status(501).send({ success: false, error: error.message });
  }
};
module.exports.delete = async (req, res) => {
  try {
    let animalToDelete = await animals.findByPk(req.params.id, {
      attributes: ["id"],
      // إلغاء الحذف الناعم مؤقتًا للحصول على السجل المحذوف
    });
    if (!animalToDelete) throw Error("رقم الحيوان غير موجود");

    await animalToDelete.destroy();
    res.status(200).send({ success: true, msg: "تمت عملية الحذف بنجاح" });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.update = async (req, res) => {
  try {
    let updateanimal = await animals.findByPk(req.params.id, {
      attributes: ["id"],
    });
    if (!updateanimal) throw Error("الحيوان غير موجود");
 
   if (!["بقرة", "عجل"].includes(req.body.gender)) {
      throw Error("الجنس يجب أن يكون إما 'بقرة' أو 'عجل'");
    }
if(req.body.gender==="عجل" && req.body.status){
  throw Error("ادخال خاطئ لا يمكن ان يتم دخال نوع الحيوان ذكر وله حالة");
}

    const ageInMonths = moment().diff(moment(req.body.birthday, "D/M/YYYY"), "months");

    if (ageInMonths < 8 && req.body.status !== "صغير") {
      throw Error("الحالة يجب أن تكون صغير للبقرة التي تقل عمرها عن 8 أشهر");
    }

    if (
      ageInMonths >= 8 &&
      !["حلوب", "غير حلوب", "جفاف"].includes(req.body.status)
    ) {
      throw Error(
        "الحالة يجب أن تكون حلوب أو غير حلوب أو جفاف للبقرة التي تزيد عمرها عن 8 أشهر"
      );
    }
    await animals.update({ ...req.body }, { where: { id: req.params.id } });
    res.status(200).send({ success: true, msg: "تمت عملية التحديث بنجاح" });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.getAll = async (req, res) => {
  try {
    let data = await animals.findAll({
      attributes: { exclude: ["id"] },
    });
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};

  