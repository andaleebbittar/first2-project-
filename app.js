const express = require("express");
const app = express();
const role = require("./models/role.model");
const user = require("./models/user.model");
 const bcrypt = require("bcryptjs");
// require("dotenv").config({ path: "./.env" });
const cookieParser = require("cookie-parser");
app.use(cookieParser());
//convert to JSON
app.use(express.json());

// routers
app.use(require("./router"));

//?if you want to create or update database execute this code
const sequelize = require("./utils/connect");
//use to create all relations with table
require("./models/relations");

//  sequelize.sync({ force: true }).then(async (_) => {
//      console.log("successfully create or Updated tables attribute ✅ ✔️✅🎉 ");

// //     // إنشاء الدور "admin"
//     let roleInfo = await role.create({
//         name: "admin",
//         data: {}, // يمكنك تعيين أي قيمة ترغب فيها لحقل "data"
//     });
// let password = "admin123"; // استبدل "admin123" بقيمة كلمة المرور الصحيحة
// let hashedPassword = await bcrypt.hash(password, 10);

// await user.create({
//     username: "admin",
//     password: hashedPassword,
//     roleId: roleInfo.id,
//     name: "admin",
// })
//         .catch((err) => {
//             console.log(err);
//         });
//     //run at port
// });

app.listen(process.env.PORT, async () => {
    console.log(`Server Run of Port : ${process.env.PORT}  ✔️✅`);
});