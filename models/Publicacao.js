import sequelize from '../config/database';
import { DataTypes} from 'sequelize';

export const Publicacao = sequelize.define('publicacao', {
    id_publicacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mensagem_publicacao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto_publicacao: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

export default Publicacao;
