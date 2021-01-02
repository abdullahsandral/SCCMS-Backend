var sequelize = require("sequelize");
const Teachers = require('./techers-model');
const Classes = require('./classes-model');
var db = require("../config/database-config");
var subjects= db.define('subjects', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    code: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    exam_date: {
        type: sequelize.DATE,
        allowNull: true
    },
    exam_start_time: {
        type: sequelize.DATE,
        allowNull: true
    },
    exam_end_time: {
        type: sequelize.DATE,
        allowNull: true
    }
});

subjects.belongsTo(Teachers,{foreignKey: 'teacher_id'});
subjects.belongsTo(Classes,{foreignKey: 'class_id'});

module.exports= subjects;
