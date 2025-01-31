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
        type: Sequelize.STRING
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    }
});

module.exports = User;