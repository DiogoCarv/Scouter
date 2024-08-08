const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoConta = sequelize.define('TipoConta', {
    id_tipo_conta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = TipoConta;
