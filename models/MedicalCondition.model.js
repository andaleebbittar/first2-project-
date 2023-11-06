//جدول المرض
const sequelize = require("../utils/connect");
const { DataTypes, Model } = require("sequelize"); //المفروض يكون موجود اسم قاعدة البيانات المربوطة معها

class MedicalCondition extends Model {}

MedicalCondition.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    animalId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    disease: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

      validate: {
        notEmpty: {
          msg: "لايمكن ان يكون اسم المرض فارغا ",
        },
      },
      set(value) {
        this.setDataValue("disease", value.trim());
      },
    },
    traetment: {
      type: DataTypes.STRING,
      unique: true,

      allowNull: false,
      validate: {
        notEmpty: {
          msg: "لايمكن ان يكون اسم العلاج فارغا ",
        },
      },
      set(value) {
        this.setDataValue("traetment", value.trim());
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      isDate: true,
      unique: "unique_key",
    },
  },
  {
    sequelize,
    modelName: "MedicalCondition", //تستخدم لتحديد اسم للنموذج
    timestamps: false, //يستخدم لتحديد الوقت والتاريخ في القاعدة او وقت انشاء وتحديث سجل معين
    paranoid: false, //تستخدم لتحسين امان قاعدة البيانات
  }
);

module.exports = MedicalCondition;
