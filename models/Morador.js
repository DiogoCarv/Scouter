// Importando o Sequelize e a instância de conexão
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.cjs'; 

// Definindo o modelo Morador
const Morador = sequelize.define('Morador', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'moradores', 
    timestamps: false     
});

// Exportando o modelo como default
export default Morador;
