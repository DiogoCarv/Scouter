import Publicacao from '../models/Publicacao';
import Realizar from '../models/Realizar';
import User from '../models/User';
export const criarPublicacao = async (req, res) => {
    try {
        const { mensagem_publicacao, foto_publicacao } = req.body;
        const novaPublicacao = await Publicacao.create({
            mensagem_publicacao,
            foto_publicacao
        });
        await Realizar.create({
            id_publicacao: novaPublicacao.id_publicacao,
            User
        });
        res.status(201).json(novaPublicacao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar publicação' });
    }
};

export const listarPublicacoes = async (req, res) => {
    try {
        const publicacoes = await Publicacao.findAll();
        res.status(200).json(publicacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar publicações' });
    }
};
