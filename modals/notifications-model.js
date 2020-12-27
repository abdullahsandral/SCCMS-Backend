var sequelize = require("sequelize"); 
var db = require("../config/database-config");
const Users = require('../modals/users-model');

var notifications= db.define('notifications', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    subject: {
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.STRING,
        allowNull: false
    },
    image_url: {
        type: sequelize.STRING,
        allowNull: true
    }
});

notifications.belongsTo(Users,{foreignKey: 'creator_id'});

module.exports= notifications;
