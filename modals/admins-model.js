const sequelize = require("sequelize");
const db = require("../config/database-config");

const Admins= db.define('admins', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    image_url: {
        type: sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: sequelize.STRING,
        allowNull: false 
    },
    last_name: {
        type: sequelize.STRING,
        allowNull: false 
    },
    cnic: {
        type: sequelize.STRING,
        allowNull: false 
    },
    contact_number: {
        type: sequelize.STRING,
        allowNull: false 
    },
    email: {
        type: sequelize.STRING,
        allowNull: false 
    },
    permanent_address: {
        type: sequelize.STRING,
        allowNull: false 
    },
    mailing_address: {
        type: sequelize.STRING,
        allowNull: false 
    },
});


module.exports = Admins;
