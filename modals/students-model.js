const sequelize = require("sequelize");
const db = require("../config/database-config");
const Classes = require('./classes-model');
const students= db.define('students', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    roll_no: {
        type: sequelize.STRING,
        allowNull: false
    },
    image_url: {
        type: sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: sequelize.STRING,
        allowNull: false 
    },
    last_name: {
        type: sequelize.STRING,
        allowNull: false 
    },
    father_name: {
        type: sequelize.STRING,
        allowNull: false 
    },
    cnic: {
        type: sequelize.STRING,
        allowNull: false 
    },
    contact_number: {
        type: sequelize.STRING,
        allowNull: false 
    },
    father_contact_number: {
        type: sequelize.STRING,
        allowNull: false 
    },
    email: {
        type: sequelize.STRING,
        allowNull: false 
    },
    gender: {
        type: sequelize.STRING,
        allowNull: false 
    },
    permanent_address: {
        type: sequelize.STRING,
        allowNull: false 
    },
    mailing_address: {
        type: sequelize.STRING,
        allowNull: false 
    },
    date_of_birth: {
        type: sequelize.DATE,
        allowNull: false 
    },
});

 students.belongsTo(Classes,{foreignKey: 'class_id'});

module.exports= students;
