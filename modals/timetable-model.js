var sequelize = require("sequelize");
var db = require("../config/database-config");
const Classes = require('./classes-model');
var timetable= db.define('timetable', {
    Day_ID: {
        type: sequelize.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Day_Name: {
        type: sequelize.STRING,
        allowNull: false
    },
    Lec_1: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    Lec_2: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    Lec_3: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    Lec_4: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    Lec_5: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    Lec_6: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    Lec_7: {
        type: sequelize.STRING,
        allowNull: false ,
    },
});

timetable.belongsTo(Classes,{foreignKey: 'Class_ID'});


module.exports= timetable;
