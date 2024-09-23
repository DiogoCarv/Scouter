import Publicacao from '../models/Publicacao.js';
import Realizar from '../models/Realizar.js';
import User from '../models/User.js';

export const criarPublicacao = async (req, res) => {
    try {
        const { mensagem_publicacao, foto_publicacao, id_user } = req.body;

        // Cria a publicação
        const novaPublicacao = await Publicacao.create({
            mensagem_publicacao,
            foto_publicacao,
        });

        // Relaciona a publicação com o usuário
        await Realizar.create({
            id_publicacao: novaPublicacao.id_publicacao,
            id_user: id_user, // id_user precisa ser passado no body
        });

        res.status(201).json(novaPublicacao);
    } catch (error) {
        console.error('Erro ao criar publicação:', error);
        res.status(500).json({ error: 'Erro ao criar publicação' });
    }
};

export const listarPublicacoes = async (req, res) => {
    try {
        const publicacoes = await Publicacao.findAll();
        res.status(200).json(publicacoes);
    } catch (error) {
        console.error('Erro ao listar publicações:', error);
        res.status(500).json({ error: 'Erro ao listar publicações' });
    }
};
