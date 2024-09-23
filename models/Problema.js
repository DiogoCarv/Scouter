import { DataTypes } from 'sequelize';
import sequelize from '../config/database.cjs'; 

// Definindo o modelo Problema
const Problema = sequelize.define('Problema', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    localizacao: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'pendente'
    },
    dataRegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    moradorId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Morador', // Nome da tabela associada
            key: 'id'
        }
    },
    orgaoCompetenteId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'OrgaoCompetente', // Nome da tabela associada
            key: 'id'
        }
    }
}, {
    tableName: 'problema', // Nome da tabela no banco
    timestamps: false
});

// Exportando o modelo como default
export default Problema;
