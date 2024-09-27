import { connectDatabase } from '../config/database.js';

// Enviar notificação
export const enviar = async (req, res) => {
  const { mensagem, moradorId } = req.body;
  try {
    const db = await connectDatabase();
    const [result] = await db.execute(
      'INSERT INTO notificacao (mensagem, moradorId, dataEnvio) VALUES (?, ?, NOW())',
      [mensagem, moradorId]
    );
    res.status(201).json({ message: 'Notificação enviada com sucesso', id: result.insertId });
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    res.status(500).json({ error: 'Erro ao enviar notificação' });
  }
};

// Listar todas as notificações
export const listarNotificacoes = async (req, res) => {
  try {
    const db = await connectDatabase();
    const [rows] = await db.execute('SELECT * FROM notificacao');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao listar notificações:', error);
    res.status(500).json({ error: 'Erro ao listar notificações' });
  }
};

// Deletar uma notificação
export const deletarNotificacao = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectDatabase();
    await db.execute('DELETE FROM notificacao WHERE id = ?', [id]);
    res.status(200).json({ message: 'Notificação excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir notificação:', error);
    res.status(500).json({ error: 'Erro ao excluir notificação' });
  }
};

// Criar nova notificação para um órgão competente
export const criarNotificacao = async (req, res) => {
  const { orgaoId, descricao } = req.body;
  try {
    const db = await connectDatabase();
    await db.execute(
      'INSERT INTO notificacao (orgaoId, descricao, dataEnvio) VALUES (?, ?, NOW())',
      [orgaoId, descricao]
    );
    res.status(201).json({ message: 'Notificação criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    res.status(500).json({ error: 'Erro ao criar notificação' });
  }
};
