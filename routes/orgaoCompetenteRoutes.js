const express = require('express');
const router = express.Router();
const { atualizarStatus, autenticar } = require('../controllers/orgaoCompetenteController');

router.post('/atualizar-status', atualizarStatus);
router.post('/autenticar', autenticar);

module.exports = router;
