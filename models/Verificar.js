const Verificar = require('../models/Verificar');

exports.verificarPublicacao = async (req, res) => {
    try {
        const { id_administrador, id_publicacao } = req.body;

        const verificacao = await Verificar.create({
            id_administrador,
            id_publicacao
        });

        res.status(201).json(verificacao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar publicação' });
    }
};
