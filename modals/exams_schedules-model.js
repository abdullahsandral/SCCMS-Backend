const sequelize = require("sequelize");
const db = require("../config/database-config");
const Classes = require('../modals/classes-model');
const Subjects = require('../modals/subjects-model');
const Exams_Categories = require('./exams_categories-model');

const Exam_Schedules= db.define('exams_categories', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    start_time: {
        type: sequelize.TIME,
        allowNull: true
    },
    end_time: {
        type: sequelize.TIME,
        allowNull: true 
    },
    exam_date: {
        type: sequelize.DATE,
        allowNull: true 
    }
});

students.belongsTo(Exams_Categories,{foreignKey: 'exam_category_id'});
students.belongsTo(Classes,{foreignKey: 'class_id'});
students.belongsTo(Subjects,{foreignKey: 'subject_id'});


module.exports = Exam_Schedules;
