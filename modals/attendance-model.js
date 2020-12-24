const sequelize = require("sequelize"); 
const db = require("../config/database-config");
const Classes = require('./classes-model');
const Stuednts = require('./students-model');
const Subjects = require('./subjects-model');

var Attendance = db.define('attendance', {
    Attendance_ID : {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Attendance_Status: {
        type: sequelize.TINYINT,
        allowNull: false
    },
    Attendance_Date: {
        type: sequelize.STRING,
        allowNull: false
    },
});

Attendance.belongsTo(Classes,{foreignKey: 'Class_ID'});
Attendance.belongsTo(Stuednts,{foreignKey: 'Student_ID'});
Attendance.belongsTo(Subjects,{foreignKey: 'Subject_ID'});

module.exports= Attendance;
