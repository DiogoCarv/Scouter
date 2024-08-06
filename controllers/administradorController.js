const Administrador = require('../models/Administrador');
const Morador = require('../models/Morador');
const Problema = require('../models/Problema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
