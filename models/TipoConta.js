import sequelize from '../config/database';
import { DataTypes} from 'sequelize';

export const TipoConta = sequelize.define('tipo_conta', {
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

export default TipoConta;
