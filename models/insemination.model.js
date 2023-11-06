//جدول اللقاحات

const sequelize = require("../utils/connect");
const { DataTypes, Model } = require("sequelize"); //المفروض يكون موجود اسم قاعدة البيانات المربوطة معها

class insemination extends Model {}

insemination.init(
  {
    animalId: {
      //رقم البقرة
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "unique_value",
    },
    inseminationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: "unique_value",
    },
    inseminatedBullid: {
      //رقمالعجل
      type: DataTypes.INTEGER,
      allowNull: false, //لايسمح بان يكون رقم الحيوان فارغ
    },
    inseminationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
     dateBirth:{
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "insemination", //تستخدم لتحديد اسم للنموذج

    timestamps: true, //يستخدم لتحديد الوقت والتاريخ في القاعدة او وقت انشاء وتحديث سجل معين
    paranoid: true, //تستخدم لتحسين امان قاعدة البيانات
    deletedAt:"dateBirth",
    parind :false 
  }
);

module.exports = insemination;
