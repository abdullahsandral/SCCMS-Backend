const sequelize = require("sequelize"); 
const db = require("../config/database-config");
const Classes = require('./classes-model');
const Stuednts = require('./students-model');
const Subjects = require('./subjects-model');

var Attendance = db.define('attendance', {
    id : {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: sequelize.TINYINT,
        allowNull: false
    },
    attendance_date: {
        type: sequelize.DATE,
        allowNull: false
    },
});

Attendance.belongsTo(Classes,{foreignKey: 'class_id'});
Attendance.belongsTo(Stuednts,{foreignKey: 'student_id'});
Attendance.belongsTo(Subjects,{foreignKey: 'id'});

module.exports= Attendance;
