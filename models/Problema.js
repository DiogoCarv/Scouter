// models/Problema.js
module.exports = (sequelize, DataTypes) => {
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
        allowNull: false
      },
      dataRegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      moradorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Morador',
          key: 'id'
        }
      },
      orgaoCompetenteId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'OrgaoCompetente',
          key: 'id'
        }
      }
    }, {
      tableName: 'Problema',
      timestamps: false
    });
  
    // Definindo as relações
    Problema.associate = (models) => {
      Problema.belongsTo(models.Morador, { foreignKey: 'moradorId' });
      Problema.belongsTo(models.OrgaoCompetente, { foreignKey: 'orgaoCompetenteId' });
    };
  
    return Problema;
  };
  