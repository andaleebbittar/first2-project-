const jwt = require("jsonwebtoken");

function generateToken(user) {
  const secretKey = "123456"; // مفتاح سري لتوقيع وفك التوكن
  const expiresIn = "7d"; // صلاحية التوكن

  const token = jwt.sign(user, secretKey, { expiresIn });

  return token;
}
//تعيين مستخدم اقتراضي في حال لم يتوفر 
const user = {
  userid: 123,
  username: "user123", // بيانات المستخدم
};

const userToken = generateToken(user);
console.log(userToken); // توليد توكن المستخدم