const sequelize = require("sequelize");
const db = require("../config/database-config");
const Users = require('./users-model');
const places= db.define('places', {
    P_ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    P_Title: {
        type: sequelize.STRING,
        allowNull: false
    },
    P_Address: {
        type: sequelize.STRING,
        allowNull: false 
    },
    P_Description: {
        type: sequelize.STRING,
        allowNull: false 
    },
    P_Image: {
        type: sequelize.STRING,
        allowNull: false 
    },
});

places.belongsTo(Users);

module.exports= places;
