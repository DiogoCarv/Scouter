const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nomedobanco', 'usuario', 'senha', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
