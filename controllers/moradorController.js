const Morador = require('../models/Morador');
const Problema = require('../models/Problema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar problema
exports.registrarProblema = async (req, res) => {
    try {
        const { descricao, localizacao, tipo, moradorId } = req.body;
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
exports.verificarProblema = async (req, res) => {
    try {
        const problemas = await Problema.findAll({ where: { moradorId: req.params.moradorId } });
        res.status(200).json(problemas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar problemas' });
    }
};

// Autenticar morador
exports.autenticar = async (req, res) => {
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