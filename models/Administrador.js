// models/Administrador.js
module.exports = (sequelize, DataTypes) => {
    const Administrador = sequelize.define('Administrador', {
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
      tableName: 'administrador',
      timestamps: false
    });
  
    return Administrador;
  };
  