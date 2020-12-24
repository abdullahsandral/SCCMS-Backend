var sequelize = require("sequelize");
const Teachers = require('./techers-model');
const Classes = require('./classes-model');
var db = require("../config/database-config");
var subjects= db.define('subjects', {
    Subject_ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Subject_Code: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Subject_Name: {
        type: sequelize.STRING,
        allowNull: false
    },
    Exam_Date: {
        type: sequelize.STRING,
        allowNull: true
    },
    Exam_Start_Time: {
        type: sequelize.STRING,
        allowNull: true
    },
    Exam_End_Time: {
        type: sequelize.STRING,
        allowNull: true
    }
});

subjects.belongsTo(Teachers,{foreignKey: 'Teacher_ID'});
subjects.belongsTo(Classes,{foreignKey: 'Class_ID'});

module.exports= subjects;
