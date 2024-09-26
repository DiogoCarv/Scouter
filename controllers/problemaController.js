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

// Listar problemas
export const listarProblemas = async (req, res) => {
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        const [problemas] = await db.execute('SELECT * FROM problema');
        res.status(200).json(problemas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar problemas' });
    }
};

// Obter problema por ID
export const obterProblema = async (req, res) => {
    const { id } = req.params;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        const [problema] = await db.execute('SELECT * FROM problema WHERE id = ?', [id]);
        if (problema.length === 0) {
            return res.status(404).json({ error: 'Problema não encontrado' });
        }
        res.status(200).json(problema[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter problema' });
    }
};

// Criar problema
export const criarProblema = async (req, res) => {
    const { descricao, localizacao, tipo, moradorId, orgaoCompetenteId } = req.body;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        const [result] = await db.execute(
            'INSERT INTO problema (descricao, localizacao, tipo, moradorId, orgaoCompetenteId, status, dataRegistro) VALUES (?, ?, ?, ?, ?, "pendente", NOW())',
            [descricao, localizacao, tipo, moradorId, orgaoCompetenteId]
        );
        res.status(201).json({ message: 'Problema criado com sucesso', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar problema' });
    }
};

// Atualizar status do problema
export const atualizarStatusProblema = async (req, res) => {
    const { id, status } = req.body;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        await db.execute('UPDATE problema SET status = ? WHERE id = ?', [status, id]);
        res.status(200).json({ message: 'Status do problema atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar status do problema' });
    }
};

// Atualizar problema
export const atualizarProblema = async (req, res) => {
    const { id } = req.params;
    const { descricao, localizacao, tipo, status, moradorId, orgaoCompetenteId } = req.body;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        await db.execute(
            'UPDATE problema SET descricao = ?, localizacao = ?, tipo = ?, status = ?, moradorId = ?, orgaoCompetenteId = ? WHERE id = ?',
            [descricao, localizacao, tipo, status, moradorId, orgaoCompetenteId, id]
        );
        res.status(200).json({ message: 'Problema atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar problema' });
    }
};

// Excluir problema
export const excluirProblema = async (req, res) => {
    const { id } = req.params;
    const db = await databaseConnect();
    if (!db) return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });

    try {
        await db.execute('DELETE FROM problema WHERE id = ?', [id]);
        res.status(200).json({ message: 'Problema excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir problema' });
    }
};
