import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Morador from './Morador';
import OrgaoCompetente from './OrgaoCompetente';

export const Problema = sequelize.define('Problema', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    localizacao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataRegistro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    vetor_de_matriz: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    moradorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Morador,
            key: 'id'
        }
    },
    orgaoCompetenteId: {
        type: DataTypes.INTEGER,
        references: {
            model: OrgaoCompetente,
            key: 'id'
        }
    }
});

module.exports = Problema;
