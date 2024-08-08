const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');


// Configuração de CORS para permitir requisições do front-end
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

// Usar rotas
app.use('/moradores', moradorRoutes);
app.use('/administradores', administradorRoutes);
app.use('/orgaos', orgaoCompetenteRoutes);
app.use('/problemas', problemaRoutes);
app.use('/notificacoes', notificacaoRoutes);
app.use('/', authRoutes); // Adicione esta linha

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
