const express = require('express');
const router = express.Router();
const { enviar } = require('../controllers/notificacaoController');

router.post('/enviar', enviar);

module.exports = router;
  