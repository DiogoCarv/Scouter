import Morador from '../models/Morador.jsx';
import Problema from '../models/Problema.jsx';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registrar novo morador
export const register = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
      

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Verificar se o morador já existe
        const existingMorador = await Morador.findOne({ where: { email } });
        if (existingMorador) {
            return res.status(400).json({ error: 'Morador já registrado com esse email.' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Criação do morador
        const novoMorador = await Morador.create({ nome, email, senha: hashedPassword });

        // Gerar token JWT
        const token = jwt.sign({ id: novoMorador.id }, 'secret', { expiresIn: '1h' });

        
        res.status(201).json({ message: 'Morador registrado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar morador' });
    }
};

// Registrar problema
export const registrarProblema = async (req, res) => {
    try {
        const { descricao, localizacao, tipo, moradorId } = req.body;
        if (!descricao || !localizacao || !tipo || !moradorId) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }
        const problema = await Problema.create({
            descricao,
            localizacao,
            tipo,
            status: 'Pendente',
            moradorId,
            dataRegistro: new Date()
        });
        res.status(201).json(problema);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar problema' });
    }
};

// Verificar problemas
export const verificarProblema = async (req, res) => {
    try {
        const problemas = await Problema.findAll({ where: { moradorId: req.params.moradorId } });
        res.status(200).json(problemas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar problemas' });
    }
};

// Autenticar morador
export const autenticar = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const morador = await Morador.findOne({ where: { email } });

        if (!morador) {
            return res.status(404).json({ error: 'Morador não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(senha, morador.senha);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: morador.id }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao autenticar morador' });
    }
};
export const criarMorador = async (req, res) => {
    try {
      // Log dos dados recebidos
      console.log('Dados recebidos no servidor:', req.body);
  
      // Desestruturar os dados recebidos
      const { nome, email, senha } = req.body;
  
      // Criar o morador
      const novoMorador = await Morador.create({ nome, email, senha });
      
      // Log do morador criado
      console.log('Morador criado com sucesso:', novoMorador);
  
      // Resposta de sucesso
      res.status(201).json({ message: 'Morador registrado com sucesso!' });
    } catch (error) {
      // Log do erro
      console.error('Erro ao registrar morador:', error);
      res.status(500).json({ message: 'Erro ao registrar morador.' });
    }
  };
  
  
  

