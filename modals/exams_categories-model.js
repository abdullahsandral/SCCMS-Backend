const sequelize = require("sequelize");
const db = require("../config/database-config");

const Exams_Categories= db.define('exams_categories', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    }
});

module.exports = Exams_Categories;
