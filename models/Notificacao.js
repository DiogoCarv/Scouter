import Sequelize from 'sequelize';
import Morador from './Morador';
import { DataTypes} from 'sequelize';
import Publicacao from './Publicacao';
import OrgaoResponsavel from './OrgaoResponsavel';

export default (sequelize) => {
    const Notificar = sequelize.define('Notificar', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mensagem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataEnvio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    moradorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Morador,
            key: 'id'
        }
    }
});
Notificar.belongsTo(Publicacao, { foreignKey: 'id_publicacao' });
Notificar.belongsTo(OrgaoResponsavel, { foreignKey: 'id_orgao' });

return Notificacao;

};
