//جدول الحيوان
const sequelize = require("../utils/connect");
const { DataTypes, Model } = require("sequelize");

class animals extends Model {}
animals.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    motherid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fatherid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,

      validate: {
        notEmpty: {
          msg: "birthday not empty",
        },
      },
    },

    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "tybeanimal not empty",
        },
      },
    },

    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "animals", //تستخدم لتحديد اسم للنموذج
    timestamps: true, //يستخدم لتحديد الوقت والتاريخ في القاعدة او وقت انشاء وتحديث سجل معين
    paranoid:true, //تستخدم لتحسين امان قاعدة البيانات
    updatedAt: false,
  }
);
module.exports = animals;
