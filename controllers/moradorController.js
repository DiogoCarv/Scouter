
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

// Registrar novo morador
export const register = async (req, res) => {
    const { nome, email, senha } = req.body;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Verificar se o morador já existe
        const [existingMorador] = await db.execute('SELECT * FROM morador WHERE email = ?', [email]);
        if (existingMorador.length > 0) {
            return res.status(400).json({ error: 'Morador já registrado com esse email.' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Criação do morador
        const [result] = await db.execute(
            'INSERT INTO morador (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hashedPassword]
        );

        // Gerar token JWT
        const token = jwt.sign({ id: result.insertId }, 'secret', { expiresIn: '1h' });

        res.status(201).json({ message: 'Morador registrado com sucesso', token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar morador' });
    }
};

// Autenticar morador
export const autenticar = async (req, res) => {
    const { email, senha } = req.body;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        const [morador] = await db.execute('SELECT * FROM morador WHERE email = ?', [email]);

        if (morador.length === 0) {
            return res.status(404).json({ error: 'Morador não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(senha, morador[0].senha);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: morador[0].id }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao autenticar morador' });
    }
};

// Função para criar um novo morador
export const createMorador = async (req, res) => {
    const { nome, email, senha } = req.body;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        const [result] = await db.execute(
            'INSERT INTO morador (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );
        res.status(201).json({ message: 'Morador criado com sucesso', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar morador' });
    }
};

// Função para excluir um morador
export const deleteMorador = async (req, res) => {
    const { id } = req.params;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        await db.execute('DELETE FROM morador WHERE id = ?', [id]);
        res.status(200).json({ message: 'Morador excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir morador' });
    }
};
