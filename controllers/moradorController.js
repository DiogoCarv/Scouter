import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDatabase } from '../config/database.js';

// Registrar novo morador
export const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const db = await connectDatabase();

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Verificar se o morador já existe
    const [existingMorador] = await db.execute('SELECT * FROM morador WHERE email = ?', [email]);
    if (existingMorador.length > 0) {
      return res.status(400).json({ error: 'Morador já registrado com esse email.' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criação do morador
    const [result] = await db.execute(
      'INSERT INTO morador (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashedPassword]
    );

    // Gerar token JWT
    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Morador registrado com sucesso', token });
  } catch (error) {
    console.error('Erro ao registrar morador:', error);
    res.status(500).json({ error: 'Erro ao registrar morador' });
  }
};

// Autenticar morador
export const autenticar = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const db = await connectDatabase();

    const [morador] = await db.execute('SELECT * FROM morador WHERE email = ?', [email]);

    if (morador.length === 0) {
      return res.status(404).json({ error: 'Morador não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(senha, morador[0].senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: morador[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao autenticar morador:', error);
    res.status(500).json({ error: 'Erro ao autenticar morador' });
  }
};

// Criar um novo morador
export const createMorador = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const db = await connectDatabase();

    // Hash da senha antes de inserir
    const hashedPassword = await bcrypt.hash(senha, 10);

    const [result] = await db.execute(
      'INSERT INTO morador (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashedPassword]
    );
    res.status(201).json({ message: 'Morador criado com sucesso', id: result.insertId });
  } catch (error) {
    console.error('Erro ao criar morador:', error);
    res.status(500).json({ error: 'Erro ao criar morador' });
  }
};

// Excluir morador
export const deleteMorador = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDatabase();

    await db.execute('DELETE FROM morador WHERE id = ?', [id]);
    res.status(200).json({ message: 'Morador excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir morador:', error);
    res.status(500).json({ error: 'Erro ao excluir morador' });
  }
};
