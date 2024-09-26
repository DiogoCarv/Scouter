import { databaseConnect } from '../config/databaseconnect';

// Função para enviar notificação
export const enviar = async (req, res) => {
    const { mensagem, moradorId } = req.body;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        const [result] = await db.execute(
            'INSERT INTO notificacao (mensagem, moradorId, dataEnvio) VALUES (?, ?, NOW())',
            [mensagem, moradorId]
        );
        res.status(201).json({ message: 'Notificação enviada com sucesso', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar notificação' });
    }
};

// Função para listar todas as notificações
export const listarNotificacoes = async (req, res) => {
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        const [rows] = await db.execute('SELECT * FROM notificacao');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar notificações' });
    }
};

// Função para deletar uma notificação
export const deletarNotificacao = async (req, res) => {
    const { id } = req.params;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        await db.execute('DELETE FROM notificacao WHERE id = ?', [id]);
        res.status(200).json({ message: 'Notificação excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir notificação' });
    }
};

const criarNotificacao = async (req, res) => {
    const { orgaoId, descricao } = req.body; // Extrai os dados do corpo da requisição
  
    try {
      const db = await databaseConnect(); // Aguarda a conexão com o banco de dados
  
      // Supondo que você tenha uma tabela chamada "notificacoes"
      const query = 'INSERT INTO notificacoes (orgao_id, descricao) VALUES ($1, $2) RETURNING *';
      const values = [orgaoId, descricao];
  
      const result = await db.query(query, values); // Executa a consulta
      res.status(201).json(result.rows[0]); // Retorna a nova notificação criada
    } catch (error) {
      console.error('Erro ao criar notificação:', error);
      res.status(500).json({ message: 'Erro ao criar notificação.' });
    }
  };