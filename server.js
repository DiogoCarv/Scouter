import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authMiddleware from './middleware/auth.js';
import dotenv from 'dotenv';
import sequelize from './config/database.js'; 
// Instanciando o Express
const app = express();
// Carrega as variáveis de ambiente
dotenv.config();
// Middleware CORS
app.use(cors({
    origin: 'http://localhost:3000', // URL do front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware BodyParser para interpretar JSON
app.use(bodyParser.json());

// Importar as rotas do backend
import moradorRoutes from './routes/moradorRoutes.js';
import administradorRoutes from './routes/administradorRoutes.js';
import orgaoCompetenteRoutes from './routes/orgaoCompetenteRoutes.js';
import problemaRoutes from './routes/problemaRoutes.js';
import notificacaoRoutes from './routes/notificacaoRoutes.js';
import authRoutes from './routes/authRoutes.js';
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

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });//log
// Rotas protegidas com middleware de autenticação
app.use('/', authRoutes);
app.use('/moradores', moradorRoutes);
app.use('/administradores', authMiddleware, adminMiddleware, administradorRoutes);
app.use('/orgaos', authMiddleware, orgaoCompetenteMiddleware, orgaoCompetenteRoutes);
app.use('/problemas', authMiddleware, problemaRoutes);
app.use('/notificacoes', authMiddleware, notificacaoRoutes);

// Rota de autenticação (não requer middleware)
app.use('/', authRoutes);

// Sincronizar o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi bem-sucedida.');
        return sequelize.sync({ alter: true });  // Sincronizando as tabelas
    })
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Erro ao conectar ao banco de dados:', error);  // Se der erro na conexão, será mostrado aqui
    });



export default app;
