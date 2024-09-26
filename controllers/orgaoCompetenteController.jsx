import { databaseConnect } from '../config/databaseconnect';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Atualizar status de um problema
export const atualizarStatus = async (req, res) => {
    const { id, status } = req.body;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        const [problema] = await db.execute('SELECT * FROM problema WHERE id = ?', [id]);

        if (problema.length === 0) {
            return res.status(404).json({ error: 'Problema não encontrado' });
        }

        await db.execute('UPDATE problema SET status = ? WHERE id = ?', [status, id]);
        res.status(200).json({ message: 'Status do problema atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar status do problema' });
    }
};

// Autenticar órgão competente
export const autenticar = async (req, res) => {
    const { email, senha } = req.body;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        const [orgaoCompetente] = await db.execute('SELECT * FROM orgaocompetente WHERE email = ?', [email]);

        if (orgaoCompetente.length === 0) {
            return res.status(404).json({ error: 'Órgão competente não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(senha, orgaoCompetente[0].senha);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: orgaoCompetente[0].id }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao autenticar órgão competente' });
    }
};
