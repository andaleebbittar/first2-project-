const Sequelize = require("sequelize");
 
require("dotenv").config({ })
let sequelize=new Sequelize(
  process.env.DATABASE,
    process.env.USER,
 process.env.PASSWORD,
    {
      dialect:"mysql",
      host: "localhost",
      operatorsAliases:"false",
      logging:false,
    }
);
// console.log({sequelize});
module.exports=sequelize;