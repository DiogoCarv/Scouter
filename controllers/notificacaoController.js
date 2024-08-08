import Notificacao from'../models/Notificacao';

// Enviar notificação
export const enviar = async (req, res) => {
    try {
        const { mensagem, moradorId } = req.body;
        const notificacao = await Notificacao.create({
            mensagem,
            moradorId,
            dataEnvio: new Date()
        });
        res.status(201).json(notificacao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar notificação' });
    }
};
