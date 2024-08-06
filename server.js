
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
