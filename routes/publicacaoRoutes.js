const express = require('express');
const router = express.Router();
const { criarPublicacao, listarPublicacoes } = require('../controllers/publicacaoController');

router.post('/publicacao', criarPublicacao);
router.get('/publicacao', listarPublicacoes);

module.exports = router;
