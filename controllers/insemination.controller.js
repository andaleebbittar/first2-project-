
const animals = require("../models/animals.model");
const _ = require("lodash");
const moment = require("moment");
const insemination = require("../models/insemination.model");
module.exports.add = async (req, res) => {
  try {
  let animalnumber = await animals.findOne({
      where: { id: req.body.animalId ,gender:"بقرة"},
    });

    if (!animalnumber) {
      throw Error("رقم البقرة غير صحيح");
    }
     if (animalnumber.status === "حامل") {
      throw Error("لا يمكنك إعطاء اللقاح للبقرة لأنها حاملة حاليًا");
    }
    let ans=await insemination.findOne({
      attributes:["id"],
    where:{
        animalId:req.body.animalId,
    }
})
  if(ans){ throw Error(" لايمكن القاح البقرة الحالية بسبب انها ملقحة حاليا");}
      const currentDate = moment();
    const birthday = moment(animalnumber.birthday);
    const ageInMonths = currentDate.diff(birthday, "months");

    if (ageInMonths <= 10 && animalnumber.gender === "بقرة") 
      throw Error("البقرة صغيرة يجب أن تتجاوز الـ 10 أشهر حتى يبدأ اللقاح");
    


   if (req.body.inseminationType === "داخلي") {
  let animalnumber = await animals.findOne({
    where: {
       id: req.body.inseminatedBullid ,
    gender:"عجل"
    },
  });

  if (!animalnumber) 
    throw Error("رقم العجل غير صحيح");


      const calfBirthday = moment(animalnumber.birthday);
      const calfAgeInMonths = currentDate.diff(calfBirthday, "months");

      if (calfAgeInMonths <=10 &&animalnumber.gender === "عجل")     
        throw Error("ان العجل عمره لا يتجاوز ال10 لا يمكنه اجراء عملية الالقاح");
      
    

  }
 
  

     await insemination.create({ 
      ...req.body,
      inseminationDate: moment(req.body.inseminationDate).format("YYYY-MM-DD"),
        });

    res.status(200).send({ success: true, msg: "تمت إضافة بنجاح" });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.delete = async (req, res) => {
   try {
    let deleteinsemination = await insemination.findByPk(req.params.id);
    if (!deleteinsemination) throw Error("السجل غير موجود");

    await deleteinsemination.destroy({ force: true });
      let cow = await animals.findByPk(deleteinsemination.animalId);
  if (!cow) throw Error("بيانات البقرة غير موجودة");

  await cow.update({ status: "حلوب" });

    res.status(200).send({ success: true, msg: "تمت عملية الحذف بنجاح" });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.update = async (req, res) => {
  try {
    let updateinsemination = await insemination.findByPk(req.params.id);
    if (!updateinsemination) throw Error("السجل غير موجود");

const animalnumber = await animals.findOne({
      where: { id: req.body.animalId },
    });

    if (!animalnumber) {
      throw Error("رقم الحيوان غير صحيح");
    }
     if (animalnumber.status === "حامل") {
      throw Error("لا يمكنك إعطاء اللقاح للبقرة لأنها حاملة حاليًا");
    }
let ans=await insemination.findOne({
    where:{
        animalId:req.body.animalId,

    }
})
if(ans){ throw Error(" لايمكن القاح البقرة الحالية بسبب انها ملقحة حاليا");}
      const currentDate = moment();
    const birthday = moment(animalnumber.birthday);
    const ageInMonths = currentDate.diff(birthday, "months");

    if (ageInMonths < 10) {
        if (animalnumber.gender === "بقرة"){
      
      throw Error("البقرة صغيرة يجب أن تتجاوز الـ 10 أشهر حتى يبدأ اللقاح");
    }}
   if (req.body.inseminationType === "داخلي") {
  let animalnumber = await animals.findOne({
    where: {
       id: req.body.inseminatedBullid ,
    
    },
  });

  if (!animalnumber) {
    throw Error("رقم العجل غير صحيح");
  }}

 if (animalnumber.gender != "بقرة") {
    throw Error("الجنس ليس بقرة");
  }  

      const calfBirthday = moment(animalnumber.birthday);
      const calfAgeInMonths = currentDate.diff(calfBirthday, "months");

      if (calfAgeInMonths < 10) {
          if (animalnumber.gender === "عجل"){
        throw Error("ان العجل عمره لا يتجاوز ال10 لا يمكنه اجراء عملية الالقاح");
      }}

await insemination.update(
  {
    ...req.body,
  inseminationDate: moment(req.body.inseminationDate).format("YYYY-MM-DD"),
      dateBirth:  moment(req.body.dateBirth).format("YYYY-MM-DD"),
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
    let data = await insemination.findAll({
      attributes: { exclude: ["id"] },
    });
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.sure = async (req, res) => {
  try {
    let ans = await insemination.findOne({
      where: {
        animalId: req.body.animalId,
        inseminatedBullid: req.body.inseminatedBullid,
        inseminationDate: req.body.inseminationDate,
      },
    });

    if (!ans) 
      throw Error(
        "البيانات المدخلة غير صحيحة الرجاء التأكد من إدخال جميع البيانات بشكل صحيح"
      );
    
let check=await insemination.findOne({
    where:{
    inseminatedBullid:req.body.inseminatedBullid,
    animalId:req.body.animalId,
   }
})
 
    if(!check)
    throw Error ("الارقام المدخلة غير صحيحة")
    if (check.state==="تم الحمل") 
      throw Error("تم إدخال حالة للحمل وأنه تم الحمل سابقًا");
    

    await animals.update(
      {
        status: "حامل",
      },
      { where: { id: req.body.animalId } }
    );

    await insemination.update({
      state:"تم الحمل"
    },{
      where:{ 
         id:check.id      
    }})

    res.status(200).json({ success: true, msg: "تم تأكيد الحمل بنجاح" });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};
module.exports.birthprocess = async (req, res) => {
  try {
    const { animalId, inseminatedBullid, inseminationDate } = req.query;

    let ans = await insemination.findOne({
      where: {
        animalId: animalId,
        inseminatedBullid: inseminatedBullid,
        inseminationDate: inseminationDate,
      },paranoid:false//deletedAt:"dateBirth"
    });

    if (!ans) {
      throw Error(
        "البيانات المدخلة غير صحيحة الرجاء التأكد من إدخال جميع البيانات بالشكل الصحيح"
      );
    }

    if (!req.body.dateBirth) {
      throw Error("لا يمكن ترك حقل تاريخ الولادة فارغ");
    }
    const insDate = moment(ans.inseminationDate);
    const eightMonthsAgo = moment().subtract(8, "months");

    if (insDate.isAfter(eightMonthsAgo)) {
      throw Error(
        "لا يمكنك إدخال حالة الولادة. يجب أن يكون قد مر على الإلقاح 8 أشهر على الأقل"
      );
    }


    if (ans.state === "تم الولادة") {
      throw Error("تم إدخال حالة الولادة وأنه تم الولادة سابقًا");
    }

    await insemination.update(
      {
        state: "تم الولادة",
        dateBirth: req.body.dateBirth,
      },
      {
        where: {
          id: ans.id,
        },
      }
    );

    
    res.status(200).json({ success: true, msg: "تم تأكيد الولادة بنجاح" });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};