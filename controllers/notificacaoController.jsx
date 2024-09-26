import { databaseConnect } from '../config/databaseconnect';

// Função para enviar notificação
export const enviar = async (req, res) => {
    const { mensagem, moradorId } = req.body;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        const [result] = await db.execute(
            'INSERT INTO notificacao (mensagem, moradorId, dataEnvio) VALUES (?, ?, NOW())',
            [mensagem, moradorId]
        );
        res.status(201).json({ message: 'Notificação enviada com sucesso', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar notificação' });
    }
};

// Função para listar todas as notificações
export const listarNotificacoes = async (req, res) => {
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        const [rows] = await db.execute('SELECT * FROM notificacao');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar notificações' });
    }
};

// Função para deletar uma notificação
export const deletarNotificacao = async (req, res) => {
    const { id } = req.params;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        await db.execute('DELETE FROM notificacao WHERE id = ?', [id]);
        res.status(200).json({ message: 'Notificação excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir notificação' });
    }
};
