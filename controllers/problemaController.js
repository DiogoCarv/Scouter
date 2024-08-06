const Problema = require('../models/Problema');

// Listar problemas
exports.listarProblemas = async (req, res) => {
    try {
        const problemas = await Problema.findAll();
        res.status(200).json(problemas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar problemas' });
    }
};

// Obter problema
exports.obterProblema = async (req, res) => {
    try {
        const problema = await Problema.findByPk(req.params.id);
        if (!problema) {
            return res.status(404).json({ error: 'Problema não encontrado' });
        }
        res.status(200).json(problema);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter problema' });
    }
};

// Criar problema
exports.criarProblema = async (req, res) => {
    try {
        const { descricao, localizacao, tipo, moradorId, orgaoCompetenteId } = req.body;
        const problema = await Problema.create({
            descricao,
            localizacao,
            tipo,
            status: 'Pendente',
            dataRegistro: new Date(),
            moradorId,
            orgaoCompetenteId
        });
        res.status(201).json(problema);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar problema' });
    }
};

// Atualizar problema
exports.atualizarProblema = async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, localizacao, tipo, status, moradorId, orgaoCompetenteId } = req.body;
        const problema = await Problema.findByPk(id);

        if (!problema) {
            return res.status(404).json({ error: 'Problema não encontrado' });
        }

        problema.descricao = descricao;
        problema.localizacao = localizacao;
        problema.tipo = tipo;
        problema.status = status;
        problema.moradorId = moradorId;
        problema.orgaoCompetenteId = orgaoCompetenteId;
        await problema.save();
        res.status(200).json(problema);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar problema' });
    }
};

// Excluir problema
exports.excluirProblema = async (req, res) => {
    try {
        const { id } = req.params;
        const problema = await Problema.findByPk(id);

        if (!problema) {
            return res.status(404).json({ error: 'Problema não encontrado' });
        }

        await problema.destroy();
        res.status(200).json({ message: 'Problema excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir problema' });
    }
};
