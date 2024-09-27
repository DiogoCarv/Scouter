import { connectDatabase } from '../config/database.js';

// Listar administradores
export const listarAdministradores = async (req, res) => {
  try {
    const db = await connectDatabase();
    const [administradores] = await db.execute('SELECT * FROM administrador');
    res.status(200).json(administradores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar administradores' });
  }
};

// Criar administrador
export const criarAdministrador = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const db = await connectDatabase();
    await db.execute('INSERT INTO administrador (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha]);
    res.status(201).json({ message: 'Administrador criado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar administrador' });
  }
};

// Atualizar administrador
export const atualizarAdministrador = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    const db = await connectDatabase();
    await db.execute('UPDATE administrador SET nome = ?, email = ?, senha = ? WHERE id = ?', [nome, email, senha, id]);
    res.status(200).json({ message: 'Administrador atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar administrador' });
  }
};

// Excluir administrador
export const excluirAdministrador = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectDatabase();
    await db.execute('DELETE FROM administrador WHERE id = ?', [id]);
    res.status(200).json({ message: 'Administrador excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir administrador' });
  }
};
