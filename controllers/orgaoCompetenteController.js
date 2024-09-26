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

export const listarOrgao = async (req, res) => {
    const query = 'SELECT * FROM orgaos'; // Ajuste para o nome correto da tabela
    const db = await databaseConnect();
    try {
      const results = await db.query(query); // Espera a execução da query
      res.json(results.rows); // Retorna os órgãos como JSON
    } catch (error) {
      console.error('Erro ao listar órgãos:', error);
      res.status(500).json({ message: 'Erro ao listar órgãos.' });
    }
  };
  export const criarOrgao = async (req, res) => {
    const { nome, email, senha, telefone } = req.body;  // Assumindo que esses são os campos necessários

    try {
        const db = await databaseConnect();  // Conectar ao banco de dados

        // Query para inserir o novo órgão competente
        const insertQuery = `
            INSERT INTO orgaoCompetente (nome, email, senha, telefone)
            VALUES (?, ?, ?, ?)
        `;

        // Executar a query
        const [result] = await db.execute(insertQuery, [nome, email, senha, telefone]);

        // Retornar sucesso
        res.status(201).json({
            message: 'Órgão Competente criado com sucesso',
            orgaoId: result.insertId,  // Retorna o ID do órgão criado
        });
    } catch (error) {
        console.error('Erro ao criar órgão competente:', error);
        res.status(500).json({ error: 'Erro ao criar órgão competente' });
    }
};
