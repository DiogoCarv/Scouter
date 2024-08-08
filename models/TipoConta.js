import sequelize from '../config/database';

const TipoConta = sequelize.define('tipo_conta', {
    id_tipo_conta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = TipoConta;
