// models/Notificacao.js
module.exports = (sequelize, DataTypes) => {
    const Notificacao = sequelize.define('Notificacao', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      mensagem: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      dataEnvio: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      moradorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Morador',
          key: 'id'
        }
      }
    }, {
      tableName: 'Notificacao',
      timestamps: false
    });
  
    // Definindo as relações
    Notificacao.associate = (models) => {
      Notificacao.belongsTo(models.Morador, { foreignKey: 'moradorId' });
    };
  
    return Notificacao;
  };
  