var sequelize = require("sequelize");
var db = require("../config/database-config");
var users= db.define('users', {
    User_ID: {
        type: sequelize.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: sequelize.STRING,
        allowNull: false
    },
    User_Name: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    Password: {
        type: sequelize.STRING,
        allowNull: false 
    },
    Role: {
        type: sequelize.STRING,
        allowNull: false 
    }
    
});

module.exports= users;
