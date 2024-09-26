import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Administrador.jsx';
import Morador from '../models/Morador.jsx';
import OrgaoCompetente from '../models/OrgaoCompetente.jsx';

import { exec } from 'child_process';

const databaseConnect = () => {
    return new Promise((resolve, reject) => {
        exec('python config/databaseconnect.py', (error, stdout, stderr) => {
            if (error) {
                reject(`Erro ao executar script: ${error.message}`);
                return;
            }
            resolve(stdout); // Retorna a saída do script Python
        });
    });
};

// Controlador de login
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Dados recebidos no login:', req.body);

    try {
        const db = await databaseConnect(); // Estabelece a conexão com o banco de dados
        let user;

        // Tenta encontrar o usuário nas diferentes tabelas
        user = await Admin.findOne({ where: { email } });
        let userType = 'administrador';

        if (!user) {
            user = await Morador.findOne({ where: { email } });
            userType = 'morador';
        }

        if (!user) {
            user = await OrgaoCompetente.findOne({ where: { email } });
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

        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};