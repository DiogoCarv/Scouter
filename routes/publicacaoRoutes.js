import express from 'express';
import router from  express.Router();
import { criarPublicacao, listarPublicacoes } from '../controllers/publicacaoController';

router.post('/publicacao', criarPublicacao);
router.get('/publicacao', listarPublicacoes);

module.exports = router;
