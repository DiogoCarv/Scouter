const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Morador = require('./Morador');

const Notificacao = sequelize.define('Notificacao', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mensagem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataEnvio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    moradorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Morador,
            key: 'id'
        }
    }
});

module.exports = Notificacao;
