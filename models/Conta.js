
import TipoConta from'./TipoConta';
import { DataTypes} from 'sequelize';

export default (sequelize) => {
        const Conta = sequelize.define('Conta', {
    id_conta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email_conta: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha_conta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto_conta: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

Conta.belongsTo(TipoConta, { foreignKey: 'id_tipo_conta' });

return Conta;

};
