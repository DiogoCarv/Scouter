const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Morador = require('./Morador');

const Notificacao = sequelize.define('notificar', {
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
Notificar.belongsTo(Publicacao, { foreignKey: 'id_publicacao' });
Notificar.belongsTo(OrgaoResponsavel, { foreignKey: 'id_orgao' });

module.exports = Notificacao;
