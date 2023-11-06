//جدول الاشعارات
const sequelize = require("../utils/connect");
const { DataTypes, Model } = require("sequelize"); //المفروض يكون موجود اسم قاعدة البيانات المربوطة معها

class notfication extends Model {}

notfication.init(
  {
    message: {
      type: DataTypes.STRING(150),
      allownull: false,
      validate: {
        notEmpty: {
          msg: "لايجب ان يكون حقل الرسالة فارغ",
        },
      },
      set(value) {
        this.setDataValue("name", value.trim()); // تستخدم لازالة الفراغات من بداية ونهاية السلسةtrime, تستخدم لتعيين قيمة محددة لعمود معين في الجدولsetdatavalue
      },
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type:{
   type: DataTypes.STRING,
   allowNull: false,
    }

  },


  {
    sequelize,
    modelName: "notfication", //تستخدم لتحديد اسم للنموذج
    timestamps: true, //يستخدم لتحديد الوقت والتاريخ في القاعدة او وقت انشاء وتحديث سجل معين
    paranoid: false, //تستخدم لتحسين امان قاعدة البيانات
    updatedAt: false,
  }
);

module.exports = notfication;
