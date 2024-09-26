import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { exec } from 'child_process';

// Função para executar o script Python de conexão
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
        const db = await databaseConnect(); // Estabelece a conexão com o banco de dados usando Python

        let user;
        let userType;

        // Verifica se o usuário está na tabela 'administrador'
        const adminQuery = `SELECT * FROM administrador WHERE email = '${email}'`;
        user = await db.execute(adminQuery);
        userType = 'administrador';

        // Se não encontrar na tabela de administradores, procura em morador
        if (!user || user.length === 0) {
            const moradorQuery = `SELECT * FROM morador WHERE email = '${email}'`;
            user = await db.execute(moradorQuery);
            userType = 'morador';
        }

        // Se não encontrar em morador, procura em órgão competente
        if (!user || user.length === 0) {
            const orgaoQuery = `SELECT * FROM orgaoCompetente WHERE email = '${email}'`;
            user = await db.execute(orgaoQuery);
            userType = 'orgaoCompetente';
        }

        // Se o usuário não for encontrado em nenhuma tabela
        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Verificar a senha
        const match = await bcrypt.compare(password, user[0].password);
        if (!match) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Gerar o token JWT
        const token = jwt.sign({ id: user[0].id, type: userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, userType }); // Retorna o token e o tipo de usuário
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};