import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/DatabaseConnect.jsx'; // Importar a conexão com o banco de dados
import Admin from '../models/Administrador.jsx';
import Morador from '../models/Morador.jsx';
import OrgaoCompetente from '../models/OrgaoCompetente.jsx';

// Controlador de login
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Dados recebidos no login:', req.body);
    const transaction = await db.transaction(); // Iniciar uma transação

    try {
        let user = await Admin.findOne({ where: { email } }, { transaction });
        let userType = 'administrador';

        // Se não encontrar na tabela de admin, procura em morador
        if (!user) {
            user = await Morador.findOne({ where: { email } }, { transaction });
            userType = 'morador';
        }

        // Se não encontrar em morador, procura em órgão competente
        if (!user) {
            user = await OrgaoCompetente.findOne({ where: { email } }, { transaction });
            userType = 'orgaoCompetente';
        }

        // Se o usuário não for encontrado em nenhuma tabela
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Verificar a senha
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Gerar o token
        const token = jwt.sign({ id: user.id, type: userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await transaction.commit(); // Confirmar a transação
        res.status(200).json({ token });
    } catch (error) {
        await transaction.rollback(); // Reverter a transação em caso de erro
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};
