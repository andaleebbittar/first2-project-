
const user = require("../models/user.model");
const role = require("../models/role.model")
const { StatusCodes } = require("http-status-codes");
 const jwt=require("jsonwebtoken")
 const bcrypt = require("bcryptjs");
const JWT_SECRET="qwertyuiopsdfghjkl";
module.exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const alreadyUser = await user.findOne({ where: { username }, raw: true });
    if (alreadyUser) {
      throw new Error("اسم المستخدم موجود مسبقا");
    }

    let passwordp = await bcrypt.hash(req.body.password,10);
    const newUser = await user.create({ ...req.body ,  password: passwordp,});

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    await user.update({ token }, { where: { id: newUser.id } });

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: {
        token,
      },
      message: "تم انشاء الحساب بنجاح",
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports.delete = async (req, res) => {
  const  userId  =  req.params.id;
  try {
    const deletedUser = await user.destroy({ where: { id: userId} });

    if (!deletedUser) {
      throw new Error("فشل في حذف الحساب");
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "تم حذف الحساب بنجاح",
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports.update = async (req, res) => {
    const userId = req.params.id;
    const { username, password } = req.body;
    try {
        const updatedUser = await user.update(
            { username, password },
            { where: { id: userId } }
        );

        if (!updatedUser) {
            throw new Error("فشل في تحديث الحساب");
        }

        res.status(StatusCodes.OK).json({
            success: true,
            message: "تم تحديث الحساب بنجاح",
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error.message,
        });
    }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // التحقق من وجود المستخدم في قاعدة البيانات
    const userInfo = await user.findOne({ where: { username }, raw: true });

    if (!userInfo)
      throw new Error("اسم المستخدم أو كلمة المرور غير صحيحة");

    // فك تشفير كلمة المرور المخزنة ومقارنتها بكلمة المرور المقدمة
    const isPasswordValid = await bcrypt.compare(password, userInfo.password);

    if (!isPasswordValid)
      throw new Error("اسم المستخدم أو كلمة المرور غير صحيحة");

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    // تخزين التوكن في قاعدة البيانات
    await user.update({ token }, { where: { id: userInfo.id } });

    // استعلام للحصول على بيانات الصلاحيات
    const roleInfo = await role.findOne({ where: { id: userInfo.roleId }, raw: true });
 delete userInfo.password;

    res.status(StatusCodes.OK).send({
      success: true,
      data: {
        token,
        role: roleInfo.name // إضافة اسم الصلاحية إلى الاستجابة
      },
      message: "تم تسجيل الدخول بنجاح"
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports.logout = async (req, res) => {
  try {
      const token = req.headers.authorization;

    if (!token)
      throw new Error("يرجى توفير التوكن");


    // التحقق مما إذا كان التوكن صحيحًا قبل تسجيل الخروج
    const userInfo = await user.findOne({ where: { token }, raw: true });

    if (!userInfo)
      throw new Error("التوكن غير صحيح");

    await user.update({ token: null }, { where: { id: userInfo.id } });

    return res.status(StatusCodes.OK).json({ success: true, message: "تم تسجيل الخروج بنجاح" });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message
    });
  }
};