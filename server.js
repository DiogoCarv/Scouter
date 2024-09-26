import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authMiddleware from './middleware/auth.js';
import dotenv from 'dotenv';
import { exec } from 'child_process'; // Importa exec para chamar o script Python

const app = express();
dotenv.config();

// Middleware CORS - Usando variável de ambiente para a origem
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Importar as rotas
import moradorRoutes from './routes/moradorRoutes.js';
import administradorRoutes from './routes/administradorRoutes.js';
import orgaoCompetenteRoutes from './routes/orgaoCompetenteRoutes.js';
import problemaRoutes from './routes/problemaRoutes.js';
import notificacaoRoutes from './routes/notificacaoRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Middleware de admin
const adminMiddleware = (req, res, next) => {
    if (req.user.tipo !== 'administrador') {
        return res.status(403).json({ message: 'Acesso negado.' });
    }
    next();
};

// Middleware de órgão competente
const orgaoCompetenteMiddleware = (req, res, next) => {
    if (req.user.tipo !== 'orgaoCompetente') {
        return res.status(403).json({ message: 'Acesso negado.' });
    }
    next();
};

// Middleware para log
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rotas
app.use('/', authRoutes);
app.use('/moradores', authMiddleware, moradorRoutes);
app.use('/administradores', authMiddleware, adminMiddleware, administradorRoutes);
app.use('/orgaos', authMiddleware, orgaoCompetenteMiddleware, orgaoCompetenteRoutes);
app.use('/problemas', authMiddleware, problemaRoutes);
app.use('/notificacoes', authMiddleware, notificacaoRoutes);

// Função para executar o script Python
const executarScriptPython = () => {
    exec('python config/databaseconnect.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar script Python: ${error.message}`);
            return;
        }
        console.log(`Resultado do script Python: ${stdout}`);
    });
};

// Sincronização com o banco de dados
executarScriptPython(); // Chama a função para executar o script Python

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
