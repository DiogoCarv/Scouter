import { databaseConnect } from '../config/databaseconnect';

// Função para obter um administrador pelo ID
export const getAdministradorById = async (req, res) => {
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    const { id } = req.params;

    try {
        const [rows] = await db.execute('SELECT * FROM administrador WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'Administrador não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar administrador' });
    }
};

// Função para criar um novo administrador
export const createAdministrador = async (req, res) => {
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    const { nome, email, senha } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO administrador (nome, email, senha) VALUES (?, ?, ?)', 
            [nome, email, senha]
        );
        res.status(201).json({ message: 'Administrador criado com sucesso', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar administrador' });
    }
};

// Função para atualizar os dados de um administrador
export const updateAdministrador = async (req, res) => {
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        await db.execute(
            'UPDATE administrador SET nome = ?, email = ?, senha = ? WHERE id = ?', 
            [nome, email, senha, id]
        );
        res.status(200).json({ message: 'Administrador atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar administrador' });
    }
};

// Função para excluir um administrador
export const deleteAdministrador = async (req, res) => {
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    const { id } = req.params;

    try {
        await db.execute('DELETE FROM administrador WHERE id = ?', [id]);
        res.status(200).json({ message: 'Administrador excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir administrador' });
    }
};
