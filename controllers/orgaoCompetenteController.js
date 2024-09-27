import { connectDatabase } from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Atualizar status de um problema
export const atualizarStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const db = await connectDatabase();
    
    // Verificar se o problema existe
    const [problema] = await db.execute('SELECT * FROM problema WHERE id = ?', [id]);

    if (problema.length === 0) {
      return res.status(404).json({ error: 'Problema não encontrado' });
    }

    // Atualizar status
    await db.execute('UPDATE problema SET status = ? WHERE id = ?', [status, id]);

    res.status(200).json({ message: 'Status do problema atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar status do problema:', error);
    res.status(500).json({ error: 'Erro ao atualizar status do problema' });
  }
};

// Autenticar órgão competente
export const autenticar = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const db = await connectDatabase();
    
    // Buscar órgão competente pelo email
    const [orgaoCompetente] = await db.execute('SELECT * FROM orgaoCompetente WHERE email = ?', [email]);

    if (orgaoCompetente.length === 0) {
      return res.status(404).json({ error: 'Órgão competente não encontrado' });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(senha, orgaoCompetente[0].senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: orgaoCompetente[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao autenticar órgão competente:', error);
    res.status(500).json({ error: 'Erro ao autenticar órgão competente' });
  }
};

// Listar órgãos competentes
export const listarOrgaos = async (req, res) => {
  try {
    const db = await connectDatabase();
    
    // Buscar todos os órgãos competentes
    const [orgaos] = await db.execute('SELECT * FROM orgaoCompetente');
    
    res.status(200).json(orgaos);
  } catch (error) {
    console.error('Erro ao listar órgãos:', error);
    res.status(500).json({ message: 'Erro ao listar órgãos.' });
  }
};

// Criar novo órgão competente
export const criarOrgao = async (req, res) => {
  const { nome, email, senha, telefone } = req.body;

  try {
    const db = await connectDatabase();

    // Gerar hash da senha
    const senhaHashed = await bcrypt.hash(senha, 10);

    // Inserir novo órgão competente
    const insertQuery = `
      INSERT INTO orgaoCompetente (nome, email, senha, telefone)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(insertQuery, [nome, email, senhaHashed, telefone]);

    res.status(201).json({ message: 'Órgão Competente criado com sucesso', orgaoId: result.insertId });
  } catch (error) {
    console.error('Erro ao criar órgão competente:', error);
    res.status(500).json({ error: 'Erro ao criar órgão competente' });
  }
};
