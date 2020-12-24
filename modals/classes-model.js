var sequelize = require("sequelize");
var db = require("../config/database-config");
var classes= db.define('classes', {
    Class_ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Class_Name: {
        type: sequelize.STRING,
        allowNull: false
    },
});

module.exports= classes;
