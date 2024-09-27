import { connectDatabase } from '../config/database.js';

// Listar problemas
export const listarProblemas = async (req, res) => {
  try {
    const db = await connectDatabase();
    const [problemas] = await db.execute('SELECT * FROM problema');
    res.status(200).json(problemas);
  } catch (error) {
    console.error('Erro ao listar problemas:', error);
    res.status(500).json({ error: 'Erro ao listar problemas' });
  }
};

// Obter problema por ID
export const obterProblema = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDatabase();
    const [problema] = await db.execute('SELECT * FROM problema WHERE id = ?', [id]);

    if (problema.length === 0) {
      return res.status(404).json({ error: 'Problema não encontrado' });
    }
    res.status(200).json(problema[0]);
  } catch (error) {
    console.error('Erro ao obter problema:', error);
    res.status(500).json({ error: 'Erro ao obter problema' });
  }
};

// Criar problema
export const criarProblema = async (req, res) => {
  const { descricao, localizacao, tipo, moradorId, orgaoCompetenteId } = req.body;

  try {
    const db = await connectDatabase();
    const [result] = await db.execute(
      'INSERT INTO problema (descricao, localizacao, tipo, moradorId, orgaoCompetenteId, status, dataRegistro) VALUES (?, ?, ?, ?, ?, "pendente", NOW())',
      [descricao, localizacao, tipo, moradorId, orgaoCompetenteId]
    );
    res.status(201).json({ message: 'Problema registrado com sucesso', id: result.insertId });
  } catch (error) {
    console.error('Erro ao registrar problema:', error);
    res.status(500).json({ error: 'Erro ao registrar problema' });
  }
};

// Atualizar status do problema
export const atualizarStatusProblema = async (req, res) => {
  const { id, status } = req.body;

  try {
    const db = await connectDatabase();
    await db.execute('UPDATE problema SET status = ? WHERE id = ?', [status, id]);
    res.status(200).json({ message: 'Status do problema atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar status do problema:', error);
    res.status(500).json({ error: 'Erro ao atualizar status do problema' });
  }
};

// Atualizar problema
export const atualizarProblema = async (req, res) => {
  const { id } = req.params;
  const { descricao, localizacao, tipo, status, moradorId, orgaoCompetenteId } = req.body;

  try {
    const db = await connectDatabase();
    await db.execute(
      'UPDATE problema SET descricao = ?, localizacao = ?, tipo = ?, status = ?, moradorId = ?, orgaoCompetenteId = ? WHERE id = ?',
      [descricao, localizacao, tipo, status, moradorId, orgaoCompetenteId, id]
    );
    res.status(200).json({ message: 'Problema atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar problema:', error);
    res.status(500).json({ error: 'Erro ao atualizar problema' });
  }
};

// Excluir problema
export const excluirProblema = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDatabase();
    await db.execute('DELETE FROM problema WHERE id = ?', [id]);
    res.status(200).json({ message: 'Problema excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir problema:', error);
    res.status(500).json({ error: 'Erro ao excluir problema' });
  }
};
