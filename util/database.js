const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense_app', 'root', '123445', {
    dialect:'mysql' , host:'localhost'
});

module.exports = sequelize;