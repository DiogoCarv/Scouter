import Publicacao from '../models/Publicacao';
import { DataTypes} from 'sequelize';
import sequelize from '../config/database';
import User from './User';

export const realizarPublicacao = async (req, res) => {
    try {
        const { id_reportador, mensagem_publicacao, foto_publicacao } = req.body;
        const novaPublicacao = await Publicacao.create({
            mensagem_publicacao,
            foto_publicacao
        });

        await Realizar.create({
            id_publicacao: novaPublicacao.id,
            id_reportador
        });
        const Realizar = sequelize.define('realizar', {
            id_realizar_publicacao: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        });

        res.status(201).json(novaPublicacao);
        Realizar.belongsTo(Publicacao, { foreignKey: 'id_publicacao' });
        Realizar.belongsTo(User, { foreignKey: 'id_reportador' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar publicação' });
    }
};
