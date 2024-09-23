// models/OrgaoCompetente.js
module.exports = (sequelize, DataTypes) => {
    const OrgaoCompetente = sequelize.define('OrgaoCompetente', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      tipo: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      senha: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    }, {
      tableName: 'OrgaoCompetente',
      timestamps: false
    });
  
    return OrgaoCompetente;
  };
  