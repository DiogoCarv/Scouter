const Realizar = require('../models/Realizar');
const Publicacao = require('../models/Publicacao');

exports.realizarPublicacao = async (req, res) => {
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
        Realizar.belongsTo(Reportador, { foreignKey: 'id_reportador' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar publicação' });
    }
};
