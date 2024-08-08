import Administrador  from '../models/Administrador';
import Morador  from '../models/Morador';
import Problema  from '../models/Problema';
import bcrypt  from 'bcrypt';
import jwt  from 'jsonwebtoken';

// Gerenciar usuários
exports.gerenciarUsuarios = async (req, res) => {
    try {
        const usuarios = await Morador.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerenciar usuários' });
    }
};

// Gerenciar problemas
exports.gerenciarProblemas = async (req, res) => {
    try {
        const problemas = await Problema.findAll();
        res.status(200).json(problemas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerenciar problemas' });
    }
};
