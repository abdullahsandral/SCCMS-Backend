//Connect DB 
const Sequelize = require('sequelize');
  module.exports = db  = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
  host: process.env.DB_URL,//'52.76.27.242',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});
