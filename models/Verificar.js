import {DataTypes} from 'sequelize';
import sequelize from '../config/database';
import Administrador from './Administrador';
import Publicacao from './Publicacao';


export async function verificarPublicacao(req, res) {
    try {
        const { id_administrador, id_publicacao } = req.body;

        const verificacao = await Verificar.create({
            id_administrador,
            id_publicacao
        });
        const Verificar = sequelize.define('verificar', {
            id_verificacao_publicacao: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        });
        Verificar.belongsTo(Publicacao, { foreignKey: 'id_publicacao' });
        Verificar.belongsTo(Administrador, { foreignKey: 'id_administrador' });

        res.status(201).json(verificacao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar publicação' });
    }
}
