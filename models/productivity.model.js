//جدول الانتاجية
const sequelize = require("../utils/connect");
const { DataTypes, Model } = require("sequelize"); //المفروض يكون موجود اسم قاعدة البيانات المربوطة معها
const animals = require("./animals.model");

class productivity extends Model {}

productivity.init(
  {
    period: {
      type: DataTypes.STRING, //الفترة الصباحية ترو والمسائيه فولس
      allowNull: false,
      unique: "unique_key",
    },

    amountmillk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    amountfood: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      isDate: true,
      unique: "unique_key",
    },
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "unique_key",
    },
  },

  {
    sequelize,
    modelName: "productivity", //تستخدم لتحديد اسم للنموذج
    timestamps: false, //يستخدم لتحديد الوقت والتاريخ في القاعدة او وقت انشاء وتحديث سجل معين
    paranoid: false, //تستخدم لتحسين امان قاعدة البيانات
  }
);

module.exports = productivity;
