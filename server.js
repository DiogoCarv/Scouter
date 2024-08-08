const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');

app.use(cors({
    origin: 'http://localhost:3000', // Substitua pela URL do seu front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Importar rotas
const moradorRoutes = require('./routes/moradorRoutes');
const administradorRoutes = require('./routes/administradorRoutes');
const orgaoCompetenteRoutes = require('./routes/orgaoCompetenteRoutes');
const problemaRoutes = require('./routes/problemaRoutes');
const notificacaoRoutes = require('./routes/notificacaoRoutes');
const authRoutes = require('./routes/authRoutes'); 

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
