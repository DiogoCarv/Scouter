// models/Publicacao.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Publicacao = sequelize.define('Publicacao', {
    id_publicacao: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    mensagem_publicacao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    foto_publicacao: {
        type: DataTypes.STRING(255),
        allowNull: true, // Publicação pode ou não ter foto
    },
}, {
    tableName: 'publicacao', // Nome da tabela no banco
    timestamps: false,
});

export default Publicacao;
