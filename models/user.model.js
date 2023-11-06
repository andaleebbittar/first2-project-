const sequelize = require ("../utils/connect");
const { DataTypes, Model } = require("sequelize"); //المفروض يكون موجود اسم قاعدة البيانات المربوطة معها


class user extends Model {}
user.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "لايجب ان يكون حقل الاسم فارغا",
        },
      },
      set(value) {
        this.setDataValue("name", value.trim()); // تستخدم لازالة الفراغات من بداية ونهاية السلسةtrime, تستخدم لتعيين قيمة محددة لعمود معين في الجدولsetdatavalue
      },
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "اسم المستخدم موجود لحساب اخر ",
      },
    },
       password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "لايجب ان يكون حقل كلمة المرور فارغا",
        },
      },
      set(value) {
        this.setDataValue("password", value.trim()); // تستخدم لازالة الفراغات من بداية ونهاية السلسةtrime, تستخدم لتعيين قيمة محددة لعمود معين في الجدولsetdatavalue
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
{
   sequelize,
    modelName: "user", //تستخدم لتحديد اسم للنموذج
    timestamps: false, //يستخدم لتحديد الوقت والتاريخ في القاعدة او وقت انشاء وتحديث سجل معين
    paranoid: false, //تستخدم من اجل منع حذف السحل وولكمن يتم تسميته غ محذوف ولم يتم عرضه في حال تم طلب عرض جميع السجلات
  }
);
module.exports = user;
