const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Date = sequelize.define('date', {
    date: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    netData: {
        allowNull: false,
        type: Sequelize.INTEGER
    }
})

module.exports = Date;