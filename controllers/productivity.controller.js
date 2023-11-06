
const animals = require("../models/animals.model");
const _ = require("lodash");
const moment = require("moment");
const productivity = require("../models/productivity.model");
const { Sequelize, Op } = require("sequelize");
module.exports.add = async (req, res) => {
  try {
    let animal=await animals.findOne({
      where:{id:req.body.animalId},
    })
    if(!animal){
       return res.status(400).json({ success: false, message: " رقم البقرة غير موجود" });
    }
   
    if (animal.gender !== "بقرة") {
      return res
        .status(400)
        .json({ success: false, message: "هذا الحيوان ليس بقرة" });
    }
    
const currentTime = moment().format("HH:mm");

if (req.body.period === "مساءا" && currentTime <= "20:00") {
  return res.status(400).json({ success: false, message: "لا يمكنك إجراء عملية الإضافة المسائية قبل الساعة 8 مساءً" });
}
if (req.body.period === "صباحا" && currentTime >= "20:00") {
  return res.status(400).json({ success: false, message: "لا يمكنك إجراء عملية الإضافة الصباحية بعد الساعة 8 مساءً" });
}

let ans =await productivity.findOne({
  where:{
    period: req.body.period,
   date:moment(req.body.date).format("YYYY-MM-DD"),
  animalId: req.body.animalId,
  }
});
if (ans) throw Error(" لايجب ان يتم حلب البقرة بنفس الفترة  ");
    const productivityRecord = await productivity.create({
      period: req.body.period,
      amountmillk: req.body.amountmillk,
      amountfood: req.body.amountfood,
   date: moment(req.body.date).format("YYYY-MM-DD"),
      animalId: req.body.animalId,
    });

    res.status(200).send({ success: true, msg: "تمت اضافة بنجاح " });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.delete = async (req, res) => {
  try {
    let protectDelete = await protectDelete.findByPk(req.params.id);
    if (!protectDelete) throw Error("السجل غير موجود");
    await protectDelete.destroy({ force: true });
    res.status(200).send({ success: true, msg: "تمت عملية الحذف بنجاح" });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.update = async (req, res) => {
  try {
    let updateprotect = await productivity.findByPk(req.params.id);
    if (!updateprotect) throw Error("السجل غير موجود");

 let animal=await animals.findOne({
      where:{id:req.body.animalId},
    })
    if(!animal){
       return res.status(400).json({ success: false, message: " رقم البقرة غير موجود" });
    }
   
    if (animal.gender !== "بقرة") {
      return res
        .status(400)
        .json({ success: false, message: "هذا الحيوان ليس بقرة" });
    }
    
const currentTime = moment().format("HH:mm");

if (req.body.period === "مساءا" && currentTime <= "20:00") {
  return res.status(400).json({ success: false, message: "لا يمكنك إجراء عملية الإضافة المسائية قبل الساعة 8 مساءً" });
}
if (req.body.period === "صباحا" && currentTime >= "20:00") {
  return res.status(400).json({ success: false, message: "لا يمكنك إجراء عملية الإضافة الصباحية بعد الساعة 8 مساءً" });
}

let ans =await productivity.findOne({
  where:{
    period: req.body.period,
   date:moment(req.body.date).format("YYYY-MM-DD"),
  animalId: req.body.animalId,
  }
});
if (ans) throw Error(" لايجب ان يتم حلب البقرة بنفس الفترة  ");
  //   const productivityRecord = await productivity.create({
  //     period: req.body.period,
  //     amountmillk: req.body.amountmillk,
  //     amountfood: req.body.amountfood,
  //  date: moment(req.body.date).format("YYYY-MM-DD"),
  //     animalId: req.body.animalId,
  //   });
await productivity.update(
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
    let data = await productivity.findAll({
      attributes: { exclude: ["id"] },
    });
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};

module.exports.getChart=async(req,res)=>{
try {

   
  let chart=await productivity.findAll({
    raw:true,
    attributes:[
      "date",
     [Sequelize.fn("SUM", Sequelize.col("amountfood")),"sumFood" ],
     [Sequelize.fn("SUM", Sequelize.col("amountmillk")),"sumMilk"],        
    ],
    group:["date"],
    where:{animalId:35},
    having:{
      sumFood:{[Op.gte]:35}
    }
  })
  res.send({data:chart})
  
} catch (error) {
  
  res.status(400).send({error})
}

}