import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database';
import process from 'NodeJS';
import authMiddleware from './middleware/auth';

app.use('/moradores', authMiddleware, moradorRoutes);
app.use('/administradores', authMiddleware, administradorRoutes);
app.use('/orgaos', authMiddleware, orgaoCompetenteRoutes);
app.use('/problemas', authMiddleware, problemaRoutes);
app.use('/notificacoes', authMiddleware, notificacaoRoutes);
// Rota de autenticação não precisa de middleware
app.use('/', authRoutes);

const adminMiddleware = (req, res, next) => {
    if (req.user.tipo !== 'administrador') {
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar esta rota.' });
    }
    next();
};

app.use('/administradores', authMiddleware, adminMiddleware, administradorRoutes);
sequelize.sync({ alter: true })  // Alterar sem recriar todas as tabelas
    .then(() => {
        console.log('Banco de dados sincronizado');
    })
    .catch(error => {
        console.error('Erro ao sincronizar banco de dados:', error);
    });


app.use(cors({
    origin: 'http://localhost:5173', // Alterar para o URL correto do front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
const orgaoCompetenteMiddleware = (req, res, next) => {
    if (req.user.tipo !== 'orgaoCompetente') {
        return res.status(403).json({ message: 'Acesso negado. Apenas órgãos competentes podem acessar esta rota.' });
    }
    next();
};

app.use('/orgaos', authMiddleware, orgaoCompetenteMiddleware, orgaoCompetenteRoutes);


// Instanciando o Express
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Substitua pela URL do seu front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());



const PORT = process.env.PORT || 5173;

sequelize.authenticate()
.then(() => {
    console.log('Conectado ao banco de dados.');

    // Sincronizando o banco de dados sem recriar as tabelas, apenas alterando quando necessário
    return sequelize.sync({ alter: true });  // Sincroniza e altera sem recriar
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
})
.catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
});

// Exportando o app, caso necessário
export default app;
