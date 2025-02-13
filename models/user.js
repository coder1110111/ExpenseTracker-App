const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
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
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    is_Premium: {
        allowNull: false,
        type: Sequelize.ENUM('true','false')
    }
});

module.exports = User;