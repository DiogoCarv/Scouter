import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

// Definindo o modelo OrgaoCompetente
const OrgaoCompetente = sequelize.define('OrgaoCompetente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    tableName: 'orgaocompetente', // Nome da tabela no banco de dados
    timestamps: false,
});

// Exportando o modelo como default
export default OrgaoCompetente;
