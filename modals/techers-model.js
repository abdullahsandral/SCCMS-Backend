const sequelize = require("sequelize");
const db = require("../config/database-config");
const teachers = db.define('teachers', {
    ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Image: {
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
    Qualification: {
        type: sequelize.STRING,
        allowNull: false 
    },
    Password: {
        type: sequelize.INTEGER,
        allowNull: false 
    },
});


module.exports= teachers;
