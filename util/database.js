const Sequelize = require('sequelize');

const sequelize = new Sequelize('expenseapp', 'root', '123445', {
    dialect:'mysql' , host:'localhost'
});

module.exports = sequelize;