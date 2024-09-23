// models/Realizar.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Publicacao from './Publicacao.js';

const Realizar = sequelize.define('Realizar', {
    id_realizar: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // Faz referência ao modelo User
            key: 'id_user',
        },
        allowNull: false,
    },
    id_publicacao: {
        type: DataTypes.INTEGER,
        references: {
            model: Publicacao, // Faz referência ao modelo Publicacao
            key: 'id_publicacao',
        },
        allowNull: false,
    },
}, {
    tableName: 'realizar', // Nome da tabela no banco
    timestamps: false,
});

export default Realizar;
