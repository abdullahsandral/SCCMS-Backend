const sequelize = require("sequelize");
const db = require("../config/database-config");

const Admins= db.define('admins', {
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
    Permanent_Address: {
        type: sequelize.STRING,
        allowNull: false 
    },
    Mailing_Address: {
        type: sequelize.STRING,
        allowNull: false 
    },
    Password: {
        type: sequelize.INTEGER,
        allowNull: false 
    },
});


module.exports = Admins;
