
import { DataTypes} from 'sequelize';

export default (sequelize) => {
    const TipoConta = sequelize.define('TipoConta', {
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

return TipoConta;

};
