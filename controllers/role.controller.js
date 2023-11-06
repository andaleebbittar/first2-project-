const role = require("../models/role.model");
const _ = require("lodash");
const { Op } = require("sequelize");
module.exports.add = async (req, res) => {
  try {
    // validate
    let myRole = await role.findOne({ where: { name: req.body.name.trim() } });
    if (myRole) throw Error("اسم الدور موجود سابقا ");

    let dataJson = (req.body.data);

    await role.create({ name: req.body.name.trim(), data: dataJson });

    res.status(200).send({ success: true, msg: "تمت اضافة الدور بنجاح " });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.delete = async (req, res) => {
  try {
      // التحقق مما إذا كان الحساب الذي يتم حذفه هو حساب المدير الأساسي
    if (req.params.id === '1') {
      return res.status(403).json({ success: false, message: "غير مسموح بحذف حساب المدير الأساسي" });
    }
    ///validate
    let myRole = await role.findOne({ where: { id: req.params.id } });
    if (!myRole) throw Error("رقم الدور غير صحيح ");

    await myRole.destroy({ force: true });
    res.status(200).send({ success: true, msg: "تمت عميةالحذف بنجاح " });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
module.exports.update = async (req, res) => {
  try {
    
        if (req.params.id === '1') {
      return res.status(403).json({ success: false, message: "غير مسموح بتعديل حساب المدير الأساسي" });
    }
    //validate
    let myRole = await role.findByPk(req.params.id);
    if (!myRole) throw Error("رقم الدور غير صحيح ");

    myRole = await role.findOne({
      where: { name: req.body.name.trim(), id: { [Op.not]: req.params.id } },
    });
    if (myRole) throw Error("اسم الدور مووجود سابقا ");

    let dataJson = JSON.stringify(_.omit(req.body, "name"));
    await role.update(
      { data: dataJson, name: req.body.name.trim() },
      { where: { id: req.params.id } }
    );
    res.status(200).send({ success: true, msg: "تمت عميةالتحديث بنجاح " });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    let all = await role.findAll({
      attributes: { exclude: ["id"] },
    });
    res.status(200).send({ success: true, data: all });
  } catch (error) {
    res.status(404).send({ success: false, error: error.message });
  }
};
