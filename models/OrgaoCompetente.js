const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrgaoCompetente = sequelize.define('OrgaoCompetente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = OrgaoCompetente;