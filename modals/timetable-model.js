var sequelize = require("sequelize");
var db = require("../config/database-config");
const Classes = require('./classes-model');
var timetable= db.define('timetable', {
    id: {
        type: sequelize.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    day_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    lec_1: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    lec_2: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    lec_3: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    lec_4: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    lec_5: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    lec_6: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    lec_7: {
        type: sequelize.STRING,
        allowNull: false ,
    },
});

timetable.belongsTo(Classes,{foreignKey: 'class_id'});

module.exports= timetable;
