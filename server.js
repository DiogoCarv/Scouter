import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authMiddleware from './middleware/auth.js';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middleware CORS - Configuração para permitir a origem do frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para JSON
app.use(bodyParser.json());

// Importar as rotas
import moradorRoutes from './routes/moradorRoutes.js';
import administradorRoutes from './routes/administradorRoutes.js';
import orgaoCompetenteRoutes from './routes/orgaoCompetenteRoutes.js';
import problemaRoutes from './routes/problemaRoutes.js';
import notificacaoRoutes from './routes/notificacaoRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Middleware de administrador
const adminMiddleware = (req, res, next) => {
    if (req.user.tipo !== 'administrador') {
        return res.status(403).json({ message: 'Acesso negado.' });
    }
    next();
};

// Middleware para órgãos competentes
const orgaoCompetenteMiddleware = (req, res, next) => {
    if (req.user.tipo !== 'orgaoCompetente') {
        return res.status(403).json({ message: 'Acesso negado.' });
    }
    next();
};

// Middleware para logging de requisições
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

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
