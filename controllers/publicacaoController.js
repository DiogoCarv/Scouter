import { connectDatabase } from '../config/database.js';

// Criar publicação
export const criarPublicacao = async (req, res) => {
  const { mensagem_publicacao, foto_publicacao, id_user } = req.body;

  try {
    const db = await connectDatabase();
    const transaction = await db.getConnection();

    try {
      // Iniciar uma transação
      await transaction.beginTransaction();

      // Cria a publicação
      const [novaPublicacao] = await transaction.execute(
        'INSERT INTO publicacao (mensagem_publicacao, foto_publicacao) VALUES (?, ?)',
        [mensagem_publicacao, foto_publicacao]
      );

      // Relaciona a publicação com o usuário
      await transaction.execute(
        'INSERT INTO realizar (id_publicacao, id_user) VALUES (?, ?)',
        [novaPublicacao.insertId, id_user]
      );

      await transaction.commit(); // Confirmar a transação

      res.status(201).json({ message: 'Publicação criada com sucesso', id: novaPublicacao.insertId });
    } catch (error) {
      await transaction.rollback(); // Reverter a transação em caso de erro
      console.error('Erro ao criar publicação:', error);
      res.status(500).json({ error: 'Erro ao criar publicação' });
    } finally {
      transaction.release();
    }
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
  }
};

// Listar publicações
export const listarPublicacoes = async (req, res) => {
  try {
    const db = await connectDatabase();

    const [publicacoes] = await db.execute('SELECT * FROM publicacao');

    res.status(200).json(publicacoes);
  } catch (error) {
    console.error('Erro ao listar publicações:', error);
    res.status(500).json({ error: 'Erro ao listar publicações' });
  }
};
