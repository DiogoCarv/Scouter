import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database';
import process from 'NodeJS';
import authMiddleware from './middleware/auth';

// Instanciando o Express
const app = express();

// Middleware CORS
app.use(cors({
    origin: 'http://localhost:5173', // URL do front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware BodyParser para interpretar JSON
app.use(bodyParser.json());

// Importar as rotas do backend
import moradorRoutes from './routes/moradorRoutes';
import administradorRoutes from './routes/administradorRoutes';
import orgaoCompetenteRoutes from './routes/orgaoCompetenteRoutes';
import problemaRoutes from './routes/problemaRoutes';
import notificacaoRoutes from './routes/notificacaoRoutes';
import authRoutes from './routes/authRoutes';

// Middlewares para verificar se o usuário é admin ou órgão competente
const adminMiddleware = (req, res, next) => {
    if (req.user.tipo !== 'administrador') {
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar esta rota.' });
    }
    next();
};

const orgaoCompetenteMiddleware = (req, res, next) => {
    if (req.user.tipo !== 'orgaoCompetente') {
        return res.status(403).json({ message: 'Acesso negado. Apenas órgãos competentes podem acessar esta rota.' });
    }
    next();
};

// Rotas protegidas com middleware de autenticação
app.use('/moradores', authMiddleware, moradorRoutes);
app.use('/administradores', authMiddleware, adminMiddleware, administradorRoutes);
app.use('/orgaos', authMiddleware, orgaoCompetenteMiddleware, orgaoCompetenteRoutes);
app.use('/problemas', authMiddleware, problemaRoutes);
app.use('/notificacoes', authMiddleware, notificacaoRoutes);

// Rota de autenticação (não requer middleware)
app.use('/', authRoutes);

// Sincronizar o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados.');
        // Sincronizando o banco de dados sem recriar as tabelas
        return sequelize.sync({ alter: true });  // Use `alter: true` para alterar as tabelas sem recriar
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
