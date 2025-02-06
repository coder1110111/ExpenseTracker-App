const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');

const LinkTable = sequelize.define('linktable', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        references: {
            model: User,
            key: "id"
        }
    },
    isActive: {
        type: Sequelize.ENUM('true','false'),

        allowNull: false
    },
    
});

module.exports = LinkTable;