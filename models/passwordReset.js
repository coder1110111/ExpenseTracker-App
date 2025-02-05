const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');

const PasswordReset = sequelize.define('PasswordReset', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
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
    token: {
        type: Sequelize.STRING,

        allowNull: false
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    expires_at: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    timestamps: false   //will make sure Sequelize does not create default createdAt and updatedAt
});

module.exports = PasswordReset;