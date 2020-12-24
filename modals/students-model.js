const sequelize = require("sequelize");
const db = require("../config/database-config");
const Classes = require('./classes-model');
const students= db.define('students', {
    Student_ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Roll_Number: {
        type: sequelize.STRING,
        allowNull: false
    },
    Student_Image: {
        type: sequelize.STRING,
        allowNull: false
    },
    First_Name: {
        type: sequelize.STRING,
        allowNull: false 
    },
    Last_Name: {
        type: sequelize.STRING,
        allowNull: false 
    },
    Father_Name: {
        type: sequelize.STRING,
        allowNull: false 
    },
    CNIC_Number: {
        type: sequelize.STRING,
        allowNull: false 
    },
    Contact_Number: {
        type: sequelize.STRING,
        allowNull: false 
    },
    Father_Contact: {
        type: sequelize.STRING,
        allowNull: false 
    },
    E_Mail: {
        type: sequelize.STRING,
        allowNull: false 
    },
    Gender: {
        type: sequelize.STRING,
        allowNull: false 
    },
    Permanent_Address: {
        type: sequelize.STRING,
        allowNull: false 
    },
    Mailing_Address: {
        type: sequelize.STRING,
        allowNull: false 
    },
    Date_Of_Birth: {
        type: sequelize.STRING,
        allowNull: false 
    },
    User_Name: {
        type: sequelize.INTEGER,
        allowNull: false 
    },
    Password: {
        type: sequelize.INTEGER,
        allowNull: false 
    },
});

 students.belongsTo(Classes,{foreignKey: 'Class_ID'});

module.exports= students;
