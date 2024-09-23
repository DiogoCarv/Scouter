// models/Morador.js
module.exports = (sequelize, DataTypes) => {
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
      tableName: 'Morador',
      timestamps: false
    });
  
    return Morador;
  };
  