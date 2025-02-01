const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Expense = sequelize.define('expense', {
    id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
    },
    description: {
        allowNull: false,
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Expense;