import { DataTypes } from 'sequelize';
import sequelize from '../config/database.jsx'; 
// Definindo o modelo Notificacao
const Notificacao = sequelize.define('Notificacao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    mensagem: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    dataEnvio: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    moradorId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Morador',  // Referência à tabela Morador
            key: 'id',
        },
    },
}, {
    tableName: 'notificacao',
    timestamps: false,
});

// Definindo as relações
Notificacao.associate = (models) => {
    Notificacao.belongsTo(models.Morador, { foreignKey: 'moradorId' });
};

// Exportando o modelo como default para ES Modules
export default Notificacao;
