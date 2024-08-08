import express from 'express';
import app from express();
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database';

app.use(cors({
    origin: 'http://localhost:3000', // Substitua pela URL do seu front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Importar rotas
import moradorRoutes from'./routes/moradorRoutes';
import administradorRoutes from'./routes/administradorRoutes';
import orgaoCompetenteRoutes from'./routes/orgaoCompetenteRoutes';
import problemaRoutes from'./routes/problemaRoutes';
import notificacaoRoutes from'./routes/notificacaoRoutes';
import authRoutes from'./routes/authRoutes'; 

// Usar rotas
app.use('/moradores', moradorRoutes);
app.use('/administradores', administradorRoutes);
app.use('/orgaos', orgaoCompetenteRoutes);
app.use('/problemas', problemaRoutes);
app.use('/notificacoes', notificacaoRoutes);
app.use('/', authRoutes); 

const PORT = process.env.PORT || 5173;

sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados.');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });
