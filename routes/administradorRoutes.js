const express = require('express');
const router = express.Router();
const { gerenciarUsuarios, gerenciarProblemas } = require('../controllers/administradorController');

router.post('/gerenciar-usuarios', gerenciarUsuarios);
router.post('/gerenciar-problemas', gerenciarProblemas);

module.exports = router;
