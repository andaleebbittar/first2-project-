const user = require("../models/user.model");
const role=require("../models/role.model");
const { Op } = require("sequelize");
const _ = require("lodash");
//const { bcrypt, compare } = require("../utils/bcrypt");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require('http-status-codes');
require("../models/relations");
module.exports.add = async (req, res) => {
  try {

    let myUser = await user.findOne({
      where: { username: req.body.username.trim() },//trimيعني ازالة الفراغات الزائدةفي بداية او نهاية الاسم 
    });
    if (myUser) {
      return res.status(400).json({ success: false, message: "اسم المستخدم موجود بالفعل" });
    }
   
        let myRole = await role.findOne({
      where: { id: req.body.roleId },
    });

    if (!myRole) {
      throw Error("صلاحية غير صحيحة");
    }
    let passwordp = await bcrypt.hash(req.body.password,10);
    await user.create({
      ...req.body,
      password: passwordp,
    
    });

    return res.status(200).json({ success: true, message: "تمت إضافة المستخدم بنجاح" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
module.exports.update = async (req, res) => {
  try {
        if (req.params.id === '1') {
      return res.status(403).json({ success: false, message: "غير مسموح بتعديل حساب المدير الأساسي" });
    }
    let myUser = await user.findByPk(req.params.id);
    if (!myUser) throw error("الرقم غير صحيح");
   

    let passwordp = await bcrypt.hash(req.body.password,10);
    await user.update(
      {
        ...req.body,
       password: passwordp,
      },
      { where: { id: req.params.id } }
    );

    res.status(200).send({ success: true, msg: "تمت التحديث بنجاح" });
  } catch (error) {
    res.status(200).send({ success: true, error: error.message });
  }
};
module.exports.delete = async (req, res) => {
  try {
    // التحقق مما إذا كان الحساب الذي يتم حذفه هو حساب المدير الأساسي
    if (req.params.id === '1') {
      return res.status(403).json({ success: false, message: "غير مسموح بحذف حساب المدير الأساسي" });
    }

    let myUser = await user.findByPk(req.params.id);
    if (!myUser) throw Error("رقم المستخدم غير صحيح");

    // عوضا عن حذف الموظف بشكل نهائي تم تحديث حالته ليكون محذوف 
    await user.update({ status: "محذوف" }, { where: { id: req.params.id } });

    res.status(200).send({ success: true, msg: "تمت عملية الحذف بنجاح" });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.getAll = async (req, res) => {
  try {
    const { page, size, search } = req.query;

    let conditionSearch = {};
    if (search) {
      conditionSearch = {
        [Op.or]: [
          { username: { [Op.like]: `%${search}%` } },
          { name: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const result = await user.findAndCountAll({
      limit: +size,
      offset: (+page - 1) * +size,
      raw: true,
      paranoid: false,
      attributes: { exclude: ['password'], include: ['name', 'username'] },
      where: {
        ...conditionSearch,
      },
    });

    res.status(StatusCodes.OK).json({ success: true, data: result });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
  }
};