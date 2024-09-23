import Problema from '../models/Problema.js';

import Notificacao from '../models/Notificacao.js';

// Listar problemas
export const listarProblemas = async (req, res) => {
    try {
        const problemas = await Problema.findAll();
        res.status(200).json(problemas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar problemas' });
    }
};

// Obter problema
export const obterProblema = async (req, res) => {
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

export const criarProblema = async (req, res) => {
    try {
        // Verifica se o usuário é um morador
        if (req.user.tipo !== 'morador') {
            return res.status(403).json({ message: 'Apenas moradores podem registrar problemas.' });
        }

        const { descricao, localizacao, tipo, orgaoCompetenteId } = req.body;

        // Cria o problema associando o morador autenticado
        const problema = await Problema.create({
            descricao,
            localizacao,
            tipo,
            moradorId: req.user.id,  // ID do morador autenticado
            orgaoCompetenteId,
        });

        res.status(201).json(problema);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar problema.' });
    }
};


export const atualizarStatusProblema = async (req, res) => {
    try {
        // Verificar se o usuário é um administrador ou órgão competente
        if (req.user.tipo !== 'administrador' && req.user.tipo !== 'orgaoCompetente') {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores ou órgãos competentes podem alterar o status.' });
        }

        const problema = await Problema.findByPk(req.params.id);
        if (!problema) {
            return res.status(404).json({ message: 'Problema não encontrado.' });
        }

        problema.status = req.body.status;
        await problema.save();

        // Enviar notificação para o morador
        const notificacao = await Notificacao.create({
            mensagem: `O status do seu problema foi atualizado para: ${problema.status}`,
            moradorId: problema.moradorId,
        });

        res.status(200).json({ problema, notificacao });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar status do problema.' });
    }
};



// Atualizar problema
export const atualizarProblema = async (req, res) => {
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
export const excluirProblema = async (req, res) => {
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
