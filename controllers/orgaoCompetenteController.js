const OrgaoCompetente = require('../models/OrgaoCompetente');
const Problema = require('../models/Problema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Atualizar status
exports.atualizarStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const problema = await Problema.findByPk(id);

        if (!problema) {
            return res.status(404).json({ error: 'Problema não encontrado' });
        }

        problema.status = status;
        await problema.save();
        res.status(200).json(problema);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar status' });
    }
};

// Autenticar órgão competente
exports.autenticar = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const orgaoCompetente = await OrgaoCompetente.findOne({ where: { email } });

        if (!orgaoCompetente) {
            return res.status(404).json({ error: 'Órgão competente não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(senha, orgaoCompetente.senha);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: orgaoCompetente.id }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao autenticar órgão competente' });
    }
};
