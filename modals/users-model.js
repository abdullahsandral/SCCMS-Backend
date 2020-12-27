var sequelize = require("sequelize");
var db = require("../config/database-config");
var users= db.define('users', {
    id: {
        type: sequelize.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    user_name: {
        type: sequelize.STRING,
        allowNull: false ,
    },
    password: {
        type: sequelize.STRING,
        allowNull: false 
    },
    role: {
        type: sequelize.STRING,
        allowNull: false 
    },
    user_id: {
        type: sequelize.STRING,
        allowNull: false 
    },
    image_url: {
        type: sequelize.STRING,
        allowNull: false 
    }
});

module.exports= users;
