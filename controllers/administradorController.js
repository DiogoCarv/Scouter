
import Morador  from '../models/Morador';
import Problema  from '../models/Problema';

// Gerenciar usuários
export const gerenciarUsuarios = async (req, res) => {
    try {
        const usuarios = await Morador.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerenciar usuários' });
    }
};

// Gerenciar problemas
export const gerenciarProblemas = async (req, res) => {
    try {
        const problemas = await Problema.findAll();
        res.status(200).json(problemas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerenciar problemas' });
    }
};
