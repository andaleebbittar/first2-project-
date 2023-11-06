const { Sequelize } = require("sequelize")
const animals = require("../models/animals.model")
const sequelize = require("../utils/connect")
const { Op } = require("sequelize");
const moment = require('moment');

module.exports.getGender=async(req,res)=>{
 try {    
    let data=await animals.findAll({
        raw:true,
        attributes:[[Sequelize.fn("count",Sequelize.col("id")),"count"],"gender"],
        group:["gender"]
    })
    let data2=await animals.findAll({
      raw:true,
      attributes:[[sequelize.fn("count",sequelize.col("id")),"count"],"status"],
    group:["status"]
   })
      let data3 = await animals.findAll({
    raw: true,
    attributes: [
      [sequelize.fn("count", sequelize.col("id")), "count"],
      [sequelize.fn("TIMESTAMPDIFF", sequelize.literal("MONTH"), sequelize.col("birthday"), sequelize.fn("CURDATE")), "age"]
    ],
    where: {
      [Op.and]: [
        sequelize.literal("TIMESTAMPDIFF(MONTH, birthday, CURDATE()) >= 1"),
        sequelize.literal("TIMESTAMPDIFF(MONTH, birthday, CURDATE()) <= 10"),
        { gender: "عجل" }
      ]
    },
    group: ["age"]
  });

 let data4=await animals.findAll({
      raw:true,
      attributes:[[sequelize.fn("count",sequelize.col("id")),"count"],"status"],
    group:["status"],  where: {
    [Op.or]: [
      { status: "صغير" },
      { status: "حامل" },
      
    ]
  }
   })

let ready=await animals.findAll({
      raw:true,
      attributes:[[sequelize.fn("count",sequelize.col("id")),"count"],"status"],
    group:["status"],  
     where: {
    status: {
      [Op.notIn]: ["صغير", "حامل", "ملقحة"],
    },
    gender: "بقرة",
  },
  
   })
 
  res.send({data:{
 data, data2, data3,data4,ready

  }});
} catch (error) {
  res.send({ error });
}
}