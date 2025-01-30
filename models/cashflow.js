const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const CashFlow = sequelize.define('cashflow', {
    id: {
        primaryKey:true,
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    typeOf: {
        allowNull:false,
        type:Sequelize.ENUM('credit','debit')
    },
    amount: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
    }
})

module.exports = CashFlow;