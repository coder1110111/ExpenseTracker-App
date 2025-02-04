const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    },
    total_expense: {
        allowNull:false,
        type: Sequelize.INTEGER
    }
});

module.exports = User;