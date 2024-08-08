import Publicacao from '../models/Publicacao';

exports.criarPublicacao = async (req, res) => {
    try {
        const { mensagem_publicacao, foto_publicacao } = req.body;
        const novaPublicacao = await Publicacao.create({
            mensagem_publicacao,
            foto_publicacao
        });
        await Realizar.create({
            id_publicacao: novaPublicacao.id_publicacao,
            id_reportador
        });
        res.status(201).json(novaPublicacao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar publicação' });
    }
};

exports.listarPublicacoes = async (req, res) => {
    try {
        const publicacoes = await Publicacao.findAll();
        res.status(200).json(publicacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar publicações' });
    }
};
