import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authMiddleware from './middleware/auth.jsx';
import dotenv from 'dotenv';
import sequelize from './config/database.jsx'; 

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
import moradorRoutes from './routes/moradorRoutes.jsx';
import administradorRoutes from './routes/administradorRoutes.jsx';
import orgaoCompetenteRoutes from './routes/orgaoCompetenteRoutes.jsx';
import problemaRoutes from './routes/problemaRoutes.jsx';
import notificacaoRoutes from './routes/notificacaoRoutes.jsx';
import authRoutes from './routes/authRoutes.jsx';

const adminMiddleware = (req, res, next) => {
    if (req.user.tipo !== 'administrador') {
        return res.status(403).json({ message: 'Acesso negado.' });
    }
    next();
};

const orgaoCompetenteMiddleware = (req, res, next) => {
    if (req.user.tipo !== 'orgaoCompetente') {
        return res.status(403).json({ message: 'Acesso negado.' });
    }
    next();
};

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

// Sincronização com banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão bem-sucedida com o banco de dados.');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });

export default app;
