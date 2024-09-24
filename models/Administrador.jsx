import { DataTypes } from 'sequelize';
import sequelize from '../config/database.jsx';  
// Definindo o modelo Administrador
const Administrador = sequelize.define('Administrador', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
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
    },
}, {
    tableName: 'administrador',
    timestamps: false,  
});

// Exportando o modelo como `default`
export default Administrador;
