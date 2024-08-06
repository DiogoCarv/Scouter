
const express = require('express');
const router = express.Router();
const { registrarProblema, verificarProblema, autenticar } = require('../controllers/moradorController');

router.post('/registrar-problema', registrarProblema);
router.get('/verificar-problema', verificarProblema);
router.post('/autenticar', autenticar);

module.exports = router;
