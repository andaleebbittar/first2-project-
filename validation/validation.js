const { StatusCodes } = require("http-status-codes");
const { type } = require("./typeValidation");//النقطة الواحدة يعني بنفس المجلد
module.exports.validate = (schema, typeSchema) => {
  let result = false;//قيمة افتراضية في حال عدم الثور على اي خطا
  return (req, res, next) => {
    switch (typeSchema) {
      //validate body
      case type.body:
        result = schema.validate(req.body);
        break;
      ///validate query
      case type.query:
        result = schema.validate(req.query);
        break;
      ///validate params
      case type.params:
        result = schema.validate(req.params);
        break;
    }
    //check if error
    //التحقق مما اذا كان هناك خطا في النتيجة التي تم لحصول عليها ودمج رسالة الخطا باستخدام الدوال الموجودة للحصول على رسالة خطا نهائية 
    if (result.error) {
      const { details } = result.error;
      const message = details.map((i) => i.message).join(" , ");
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Validation Error Message :" + message,
      });
    }

    next();
  };
};
//   http الكود يوفر طريقة سهلة وامنة  للتحقق من صحة البيانات في طلبات 
