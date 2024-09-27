import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDatabase } from '../config/database.js';

// Registrar um novo usuário
export const register = async (req, res) => {
  const { nome, email, password, userType } = req.body;

  try {
    const db = await connectDatabase();

    // Verificar se o e-mail já existe
    let checkQuery;
    if (userType === 'administrador') {
      checkQuery = `SELECT * FROM administrador WHERE email = ?`;
    } else if (userType === 'morador') {
      checkQuery = `SELECT * FROM morador WHERE email = ?`;
    } else if (userType === 'orgaoCompetente') {
      checkQuery = `SELECT * FROM orgaoCompetente WHERE email = ?`;
    } else {
      return res.status(400).json({ error: 'Tipo de usuário inválido' });
    }

    const [rows] = await db.execute(checkQuery, [email]);

    if (rows.length > 0) {
      return res.status(400).json({ error: 'Usuário já registrado com este e-mail' });
    }

    // Gerar hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir novo usuário na tabela correta
    let insertQuery;
    if (userType === 'administrador') {
      insertQuery = `INSERT INTO administrador (nome, email, senha) VALUES (?, ?, ?)`;
    } else if (userType === 'morador') {
      insertQuery = `INSERT INTO morador (nome, email, senha) VALUES (?, ?, ?)`;
    } else if (userType === 'orgaoCompetente') {
      insertQuery = `INSERT INTO orgaoCompetente (nome, email, senha) VALUES (?, ?, ?)`;
    }

    await db.execute(insertQuery, [nome, email, hashedPassword]);

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

// Login de usuário
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectDatabase();

    let user;
    let userType;

    // Verificar se o usuário está na tabela 'administrador'
    const [admin] = await db.execute('SELECT * FROM administrador WHERE email = ?', [email]);
    if (admin.length > 0) {
      user = admin[0];
      userType = 'administrador';
    }

    // Verificar se está na tabela 'morador'
    if (!user) {
      const [morador] = await db.execute('SELECT * FROM morador WHERE email = ?', [email]);
      if (morador.length > 0) {
        user = morador[0];
        userType = 'morador';
      }
    }

    // Verificar se está na tabela 'orgaoCompetente'
    if (!user) {
      const [orgao] = await db.execute('SELECT * FROM orgaoCompetente WHERE email = ?', [email]);
      if (orgao.length > 0) {
        user = orgao[0];
        userType = 'orgaoCompetente';
      }
    }

    // Se o usuário não for encontrado em nenhuma tabela
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verificar a senha
    const match = await bcrypt.compare(password, user.senha);
    if (!match) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id, type: userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, userType }); // Retorna o token e o tipo de usuário
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
