var sequelize = require("sequelize"); 
var db = require("../config/database-config");
var notifications= db.define('notifications', {
    Notification_ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Creator_Name: {
        type: sequelize.STRING,
        allowNull: false
    },
    Notification_Subject: {
        type: sequelize.STRING,
        allowNull: false
    },
    Description: {
        type: sequelize.STRING,
        allowNull: false
    },
    Notification_Image: {
        type: sequelize.STRING,
        allowNull: true
    }
});

module.exports= notifications;
