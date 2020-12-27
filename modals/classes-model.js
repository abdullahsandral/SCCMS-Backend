var sequelize = require("sequelize");
var db = require("../config/database-config");
var classes= db.define('classes', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: sequelize.STRING,
        allowNull: false
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
});

module.exports= classes;
