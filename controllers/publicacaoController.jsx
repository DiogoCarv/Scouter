import Publicacao from '../models/Publicacao.jsx';
import Realizar from '../models/Realizar.jsx';
import db from '../config/DatabaseConnect.jsx'; // Importar a conexão com o banco de dados

export const criarPublicacao = async (req, res) => {
    const transaction = await db.transaction(); // Iniciar uma transação
    try {
        const { mensagem_publicacao, foto_publicacao, id_user } = req.body;

        // Cria a publicação
        const novaPublicacao = await Publicacao.create({
            mensagem_publicacao,
            foto_publicacao,
        }, { transaction }); // Passar a transação

        // Relaciona a publicação com o usuário
        await Realizar.create({
            id_publicacao: novaPublicacao.id_publicacao,
            id_user: id_user,
        }, { transaction }); // Passar a transação

        await transaction.commit(); // Confirmar a transação
        res.status(201).json(novaPublicacao);
    } catch (error) {
        await transaction.rollback(); // Reverter a transação em caso de erro
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
